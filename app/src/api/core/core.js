
/* Takes a url and a parameters object and returns a a url with the paramters 
 * included as query string (if any parameters were specified). For instance: 
 * addParametersToUrl("https://www.google.com", {q: "John Doe"})
 *     Outputs https://www.google.com?q=John+Doe 
 */
function addParametersToUrl(url, params=null){
    if(!params){ return url; }
    const query_string = constructQueryString(params);
    return query_string
        ? url + "?" + query_string
        : url;
}

function constructQueryString(params={}){
    const param_keys = Object.keys(params);
    if(!param_keys.length){
        return null;
    }
    return param_keys.map(param_key => {
        const param_value = params[param_key];
        if(Array.isArray(param_value)){
            // if param_value is an array like ['a' 'b'] then we map it to: key=a&key=b
            return param_value.map(value => {
                return encodeURIComponent(param_key) + '=' + encodeURIComponent(value);
            }).join('&')
        } else{
            // If param_value is a single value then we map it to key=value
            return encodeURIComponent(param_key) + '=' + encodeURIComponent(params[param_key]);
        }
    })
    .join('&');
}

function defaultMapError(error=null, request_details=null, response_details=null){
    return {
        error: error,
        request_details: request_details,
        response_details: response_details
    };
}

function defaultMapRequestBody(data) {
    return data;
}

function defaultMapResponse(data, request_details, response_details){
    return {
        "data": data,
        "request_details": request_details,
        "response_details": response_details
    };
}

/* Fail responses with a HTTP status code outside the 200-299 range. (fetch doesn't mark these as fails). */
function failNon2xxResponses(response_details) {
    const { status, status_text } = response_details;
    return response_details.ok
        ? response_details 
        : Promise.reject(`Request completed with a status code outside of the 2xx range (${status} ${status_text})`);
}

function getCopiedBody(response_details) {
    try{
        const body = response_details.body || null;
        var deep_copy_body = JSON.parse(JSON.stringify(body));
        return deep_copy_body;
    } catch(e) {
        throw "Error while copying the response body";
    }
}

function getErrorMessage(error) {
    return typeof error === "string" ? error : error.message || "Unknown error";
}

function getFetchRequestSettings(http_method, body, config){
    const { 
        cache="no-cache",
        credentials="same-origin",
        headers={},
        mode="cors" 
    } = config;

    const fetch_settings = {
        cache,
        credentials,
        headers,
        http_method,
        mode
    }

    if(body){
        settings.body = JSON.stringify(body)
    }

    return fetch_settings;
}
function getResponseDetails(response){
    const {
        headers,
        ok,
        redirected,
        status,
        statusText,
        type,
        url,
        useFinalURL
    } = response;
    const response_details = {
        headers,
        ok,
        redirected,
        status,
        statusText,
        type,
        url,
        useFinalURL
    };

    // TODO: look into chunked responses. Does this work in that case?
    return response.json().then(function(json_body){
        response_details.body = json_body;
        return response_details;
    }).catch(function(err){
        /* If there is no content or the content is not JSON then
         * there will be an error while reading the response with json().
         * Here we catch that error and simply return the response
         * details without the body. */
        return response_details;
    });
}

function del(url, config={}){
    return _request("DELETE", url, config);
}
function get(url, config={}){
    return _request("GET", url, config);
}
function patch(url, config={}){
    return _request("PATCH", url, config);
}
function post(url, config={}){
    return _request("POST", url, config);
}
function put(url, config={}){
    return _request("PUT", url, config);
}
function _request(http_method, url, config){
    const {
        body,
        params
    } = config;
    const mapResponse = config.mapResponse || defaultMapResponse;
    const mapRequestBody = config.mapRequestBody || defaultMapRequestBody;
    const mapError = config.mapError || defaultMapError;
    const full_url = addParametersToUrl(url, params);
    const mapped_request_body = body ? mapRequestBody(body) : null;
    var fetch_request_settings = getFetchRequestSettings(http_method, mapped_request_body, config);

    var response_details = null;
    return fetch(full_url, fetch_request_settings)
        .then(getResponseDetails)
        .then(result => { response_details = result; return response_details;}) // store response_details in local variable for later reference
        .then(failNon2xxResponses)
        .then(getCopiedBody)
        .then(function(response_body) {
            return mapResponse(response_body, request_details, response_details);
        })
        .catch(function(error) {
            throw mapError(getErrorMessage(error), request_details, response_details);
        });
}

export {
    del,
    get,
    getBaseUrl,
    patch,
    post,
    put,
    request
};


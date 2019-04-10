import * as api_core from 'core/core.js';
import * as endpoints from 'endpoints/endpoints.index.js';


class ApiConnect {
    constructor({base_url_main_api}) {
        this.base_url_main_api = base_url_main_api;
        this.core = new ApiCore({base_url_main_api});
        
        // Add all endpoint methods to this instance of ApiConnect.
        Object.keys(endpoints).forEach(endpoint_name => {
            this.api[endpoint_name] = endpoints[endpoint_name].bind(this, core)
        });
    }
}

return ApiConnect;
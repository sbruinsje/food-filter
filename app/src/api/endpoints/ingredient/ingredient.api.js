
import * as mappers from 'endpoints/ingredient/ingredient.mappers.js';

function _getIngredient(core, ingredient_id) {
    const url = `${api_core.getBaseUrl()}/v1/prcards/${sender_id}/`;

    return api_core.get(url, {
        mapResponse: mappers.mapIngredientFromResponse
    });
}


export {
    _getIngredient,
};

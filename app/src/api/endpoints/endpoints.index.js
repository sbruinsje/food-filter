import * as api_core from "core/api-core.js";




// ############################################################
// Expose ingredient api
// ############################################################
import * as ingredient_handlers from "endpoints/ingredient/ingredient.handlers.js";
import * as ingredient_endpoint_methods from "endpoints/ingredient/ingredient.handlers.js";

	_createIngredient,
	_getIngredient,
	_getIngredients,
    _updateIngredient,
    _deleteIngredient
} from "endpoints/ingredient/ingredient.api.js";




const bound_endpoint_functions = bindParamsForEach([
    _createIngredient,
	_getIngredient,
	_getIngredients,
    _updateIngredient,
    _deleteIngredient
], [
    api_core,
    ingredient_handlers
]);

export const createSender = _createSender.bind(null, api_core, sender_handlers);
export const archiveSender = _archiveSender.bind(null, api_core, sender_handlers);
export const getSender = _getSender.bind(null, api_core, sender_handlers);
export const getSenders = _getSenders.bind(null, api_core, sender_handlers);
export const updateSender = _updateSender.bind(null, api_core, sender_handlers);




function bindParamsForEach(func_list=[], params=[]){
    const bound_func_list = func_list.map(func => {
        func.bind(null, ...params);
    })
    return bound_func_list;
}
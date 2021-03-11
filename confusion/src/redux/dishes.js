import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    err: null,
    dishes: []
    }, actions) => {
    switch (actions.type) {
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, err: null, dishes: actions.payload };
        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, err: actions.payload, dishes: [] };
        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, err: null, dishes: [] };

        default:
            return state;
    }
}
import {CURRENCY_DATA_LOAD, CURRENCY_SINGLE_LOAD} from '../action-types';

const initialState = {
    data: [],
    currency: {}
};

export const CurrencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_DATA_LOAD:
            return { ...state, data: action.payload };
        case CURRENCY_SINGLE_LOAD:
            return { ...state, currency: action.payload };
        default:
            return state;
    }
};
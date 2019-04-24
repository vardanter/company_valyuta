import {FULL_DATA_LOAD, COMPANY_DATA_LOAD, COMPANY_SINGLE_LOAD} from '../action-types';

const initialState = {
    data: [],
    company: {},
    fullData: null
};

export const CompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FULL_DATA_LOAD:
            return { ...state, fullData: action.payload };
        case COMPANY_DATA_LOAD:
            return { ...state, data: action.payload };
        case COMPANY_SINGLE_LOAD:
            return { ...state, company: action.payload };
        default:
            return state;
    }
};
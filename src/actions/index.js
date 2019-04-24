import * as actionTypes from '../action-types';

export const getFullData = (payload) => {
    return {
        type: actionTypes.FULL_DATA_LOAD,
        payload
    }
};

export const getCompanies = (payload) => {
    return {
        type: actionTypes.COMPANY_DATA_LOAD,
        payload
    }
};

export const getCompany = (payload) => {
    return {
        type: actionTypes.COMPANY_SINGLE_LOAD,
        payload
    }
};

export const getCurrencies = (payload) => {
    return {
        type: actionTypes.CURRENCY_DATA_LOAD,
        payload
    }
};

export const getCurrency = (payload) => {
    return {
        type: actionTypes.CURRENCY_SINGLE_LOAD,
        payload
    }
};
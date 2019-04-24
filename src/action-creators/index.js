import * as actions from '../actions';

export const getFullData = (storeService) => () => (dispatch) => {
    const fullData = storeService.getData();
    dispatch(actions.getFullData(fullData));
};

export const getCompanies = (storeService) => () => (dispatch) => {
    const companies = storeService.getCompanies();
    dispatch(actions.getCompanies(companies));
};

export const getCompany = (storeService) => (id) => (dispatch) => {
    const company = storeService.getCompany(id);
    dispatch(actions.getCompany(company));
};

export const addCompany = (storeService) => (data, id = 0) => (dispatch) => {
    return new Promise(resolve => {
        storeService.addCompany(data, id);
        setTimeout(() => {
            resolve(true)
        }, 1000);
    });
};

export const deleteCompany = (storeService) => (id) => (dispatch) => {
    storeService.deleteCompany(id);
    const companies = storeService.getCompanies();
    dispatch(actions.getCompanies(companies));
};

export const getCurrencies = (storeService) => () => (dispatch) => {
    const currencies = storeService.getCurrencies();
    dispatch(actions.getCurrencies(currencies));
};

export const getCurrency = (storeService) => (id) => (dispatch) => {
    const currency = storeService.getCurrency(id);
    dispatch(actions.getCurrency(currency));
};

export const addCurrency = (storeService) => (data, id = 0) => (dispatch) => {
    return new Promise(resolve => {
        storeService.addCurrency(data, id);
        setTimeout(() => {
            resolve(true)
        }, 1000);
    });
};

export const deleteCurrency = (storeService) => (id) => (dispatch) => {
    storeService.deleteCurrency(id);
    const currencies = storeService.getCurrencies();
    dispatch(actions.getCurrencies(currencies));
};

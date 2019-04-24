import { combineReducers } from 'redux';
import { CompanyReducer } from './company';
import { CurrencyReducer } from './currencies';

export const reducers = combineReducers({
    company: CompanyReducer,
    currencies: CurrencyReducer
});
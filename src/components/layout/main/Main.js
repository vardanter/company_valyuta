import React from 'react';
import Home from "../../home";
import Currency from '../../../containers/currency';
import Company from '../../../containers/company';
import withLayoutWrapper from '../../hoc/layout';
import { Route, Switch } from "react-router-dom";
import CompanyForm from "../../../containers/company/CompanyForm";
import CurrencyForm from "../../../containers/currency/CurrencyForm";
import CompanySingle from "../../../containers/company/CompanySingle";


const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/currencies" component={Currency}/>
            <Route path="/currency/create" component={CurrencyForm}/>
            <Route path="/currency/edit/:id" component={CurrencyForm}/>
            <Route exact path="/companies" component={Company}/>
            <Route path="/company/create" component={CompanyForm}/>
            <Route path="/company/edit/:id" component={CompanyForm}/>
            <Route path="/company/view/:id" component={CompanySingle}/>
        </Switch>
    )
};
export default  withLayoutWrapper()(Main);

import React, { Component } from 'react';
import {bindActionCreators, compose} from "redux";
import { withServiceProvider } from '../../components/hoc/withServiceProvider';
import { getCurrencies, addCompany, getCompany } from "../../action-creators";
import Form from '../../components/form';
import {connect} from "react-redux";

class CompanyForm extends Component {

    state = {
        companyName: '',
        companyCurrencies: [],
        id: 0,
        isUpdated: false
    };

    timer = null;

    static getDerivedStateFromProps(nextProps, prevState) {
        const { currencyData, company, match: {params} } = nextProps;
        const { companyCurrencies } = prevState;
        let newState = null;
        if (companyCurrencies.length === 0 && currencyData.length > 0 && !params.id) {
            const newCompanyCurrencies = [];
            currencyData.forEach(currency => {
                newCompanyCurrencies.push({
                    key: currency.id,
                    value: 0
                });
            });
            newState = {companyCurrencies: newCompanyCurrencies};
        } else if (company.id && companyCurrencies.length === 0) {
            const { currencyData, name, id } = company;

            newState = {
                companyName: name,
                companyCurrencies: currencyData,
                id
            };
        }

        return newState;
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        if (params.id) {
            this.props.getCompany(params.id);
        }

        this.props.getCurrencies();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { companyName, companyCurrencies, id} = this.state;
        if (companyName != '') {
            this.props.addCompany({
                name: companyName,
                currencyData: companyCurrencies
            }, id).then(result => {
                this.setState({isUpdated: result});
                this.timer = setTimeout(() => {
                    this.setState({isUpdated: false});
                }, 5000);
                // this.props.history.push('/companies')
            });
        }
    }

    onChange = (e) => {
        const target = e.target;

        this.setState({companyName: target.value})
    }

    onCurrencyChange = (e) => {
        const target = e.target;
        const targetId = parseInt(target.dataset.id);
        const {companyCurrencies} = this.state;
        const filteredCompanyCurrencies = companyCurrencies.filter(currency => currency.key !== targetId);
        const newCompanyCurrencies = [{key: parseInt(target.dataset.id), value: target.value}].concat(filteredCompanyCurrencies);

        this.setState({companyCurrencies: newCompanyCurrencies})
    }

    render() {
        const { companyName, companyCurrencies, isUpdated } = this.state;
        const { currencyData } = this.props;

        return (
            <div>
                <h2>{ this.state.id ? `Обновление компании ${companyName}` : 'Добавление новой компании'}</h2>
                {
                    isUpdated && <div className="alert alert-success">Компания успешно обновлена</div>
                }
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="companyName">Название</label>
                        <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={this.onChange}
                            className="form-group__item"
                        />
                    </div>
                    <h5>Цены на валюту</h5>
                    {
                        currencyData.map(item => {
                            const currency = companyCurrencies.find(currency => currency.key == item.id);

                            return (
                                <div key={item.id} className="form-group">
                                    <label htmlFor={`cur_${item.id}`}>{item.name}</label>
                                    <input
                                        id={`cur_${item.id}`}
                                        type="number"
                                        step=".01"
                                        name={`currency_${item.id}`}
                                        data-id={item.id}
                                        value={currency && currency.value}
                                        onChange={this.onCurrencyChange}
                                        className="form-group__item"
                                    />
                                </div>
                            )
                        })
                    }

                    <div className="form-btn-group">
                        <button className="button button-green">Сохранить</button>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencyData: state.currencies.data,
        company: state.company.company
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getCurrencies: getCurrencies(storeService),
        getCompany: getCompany(storeService),
        addCompany: addCompany(storeService)
    }, dispatch);
};

export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(CompanyForm);
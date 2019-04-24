import React, { Component } from 'react';
import {bindActionCreators, compose} from "redux";
import { withServiceProvider } from '../../components/hoc/withServiceProvider';
import { addCurrency, getCurrency } from "../../action-creators";
import Form from '../../components/form';
import {connect} from "react-redux";

class CurrencyForm extends Component {

    state = {
        currencyName: '',
        id: 0,
        isUpdated: false
    };

    timer = null;

    static getDerivedStateFromProps(nextProps, prevState) {
        const { currency, match: {params} } = nextProps;
        const { currencyName } = prevState;
        let newState = null;
        if (currencyName === '' && currency.id && params.id) {
            newState = {
                currencyName: currency.name,
                id: parseInt(params.id)
            };
        }

        return newState;
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        if (params.id) {
            this.props.getCurrency(params.id);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { currencyName, id} = this.state;
        if (currencyName !== '') {
            this.props.addCurrency({
                name: currencyName
            }, id).then(result => {
                this.setState({isUpdated: result});
                this.timer = setTimeout(() => {
                    this.setState({isUpdated: false});
                }, 5000);
            });
        }
    }

    onChange = (e) => {
        const target = e.target;

        this.setState({currencyName: target.value})
    }

    render() {
        const { currencyName, isUpdated } = this.state;

        return (
            <div>
                <h2>{ this.state.id ? `Обновление валюты ${currencyName}` : 'Добавление новой валюты'}</h2>
                {
                    isUpdated && <div className="alert alert-success">Валюта успешно обновлена</div>
                }
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="currencyName">Название</label>
                        <input
                            id="currencyName"
                            type="text"
                            name="currencyName"
                            value={currencyName}
                            onChange={this.onChange}
                            className="form-group__item"
                        />
                    </div>

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
        currency: state.currencies.currency
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getCurrency: getCurrency(storeService),
        addCurrency: addCurrency(storeService)
    }, dispatch);
};

export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(CurrencyForm);
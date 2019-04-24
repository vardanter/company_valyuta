import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withServiceProvider } from '../../components/hoc/withServiceProvider';
import { getCompany, getCurrencies } from '../../action-creators';

class CompanySingle extends Component {

    componentDidMount() {
        const {match: {params}} = this.props;
        if (params.id) {
            this.props.getCurrencies();
            this.props.getCompany(params.id);
        }
    }

    render() {
        const {company, currencies} = this.props;

        if (!company.id) {
            return <div>Компания не найдена</div>
        }
        return (
            <div>
                <h2>{company.name}</h2>
                {
                    company.currencyData.map(currency => {
                        const currencyData = currencies.find(item => item.id === currency.key);
                        return (
                            <div key={currency.key} className="row">
                                <div className="col">{currencyData.name}</div>
                                <div className="col right-text">{currency.value}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        company: state.company.company,
        currencies: state.currencies.data
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getCompany: getCompany(storeService),
        getCurrencies: getCurrencies(storeService)
    }, dispatch)
};

export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(CompanySingle);
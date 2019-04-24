import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import EditableList from "../../components/editable-list";
import {deleteCurrency, getCurrencies, getCompany} from "../../action-creators";
import {compose, bindActionCreators} from "redux";
import {withServiceProvider} from "../../components/hoc/withServiceProvider";
import {connect} from "react-redux";

class Currency extends Component {

    componentDidMount() {
        this.props.getCurrencies();
    }

    onDelete = (id) => {
        if (window.confirm('Вы действительно хотите удалить валюту?')) {
            this.props.deleteCurrency(id);
        }
    }

    render() {
        const {data} = this.props;
        if (!data) {
            return <div>...</div>
        }
        return (
            <div>
                <h2>Список валют</h2>
                <div>
                    <NavLink to="/currency/create" className="button button-green">Добавить валюту</NavLink>
                </div>
                <EditableList
                    data={data}
                    editUrl="/currency/edit"
                    onDelete={this.onDelete}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.currencies.data
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getCurrencies: getCurrencies(storeService),
        getCompany: getCompany(storeService),
        deleteCurrency: deleteCurrency(storeService)
    }, dispatch)
};

export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(Currency);
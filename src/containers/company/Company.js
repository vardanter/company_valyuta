import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withServiceProvider } from '../../components/hoc/withServiceProvider';
import { getCompanies, getCompany, deleteCompany } from '../../action-creators';
import EditableList from "../../components/editable-list";
import {NavLink} from "react-router-dom";

class Company extends Component {

    componentDidMount() {
        this.props.getCompanies();
    }

    onDelete = (id) => {
        if (window.confirm('Вы действительно хотите удалить компанию?')) {
            this.props.deleteCompany(id);
        }
    }

    render() {
        const {data} = this.props;

        if (!data.length) {
            return <div>...</div>
        }
        return (
            <div>
                <h2>Список компаний</h2>
                <div>
                    <NavLink to="/company/create" className="button button-green">Добавить компанию</NavLink>
                </div>
                <EditableList
                    data={data}
                    editUrl="/company/edit"
                    onDelete={this.onDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.company.data
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getCompanies: getCompanies(storeService),
        getCompany: getCompany(storeService),
        deleteCompany: deleteCompany(storeService)
    }, dispatch)
};



export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(Company);
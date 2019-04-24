import React, { Component } from 'react';
import FullList from '../full-list';
import {getFullData} from "../../action-creators";
import {compose, bindActionCreators} from "redux";
import {withServiceProvider} from "../hoc/withServiceProvider";
import {connect} from "react-redux";

class Home extends Component {

    componentDidMount() {
        this.props.getFullData();
    }
    
    render() {
        const {fullData} = this.props;
        if (!fullData) {
            return <div>...</div>
        }
        return (
            <div>
                <h1>Акции компаний</h1>
                <FullList data={fullData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fullData: state.company.fullData
    }
};

const mapDispatchToProps = (dispatch, { storeService }) => {
    return bindActionCreators({
        getFullData: getFullData(storeService)
    }, dispatch)
};

export default compose(
    withServiceProvider(),
    connect(mapStateToProps, mapDispatchToProps)
)(Home);
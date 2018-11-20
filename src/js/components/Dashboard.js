import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core'

import CardSummary from './common/card/CardSummary';

import withAuthorization from './withAuthorization';
import { CURRENT_PAGE_SET } from '../constants/action-types';

const styles = theme => ({
});

class DashboardPage extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { onSetCurrentPage } = this.props;

        onSetCurrentPage('Dashboard');
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CardSummary />

            </React.Fragment >
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentPage: (currentPage) => dispatch({ type: CURRENT_PAGE_SET, currentPage }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(null, mapDispatchToProps),
    withStyles(styles),
)(DashboardPage);
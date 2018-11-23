import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/'

import CardSummary from './layouts/CardSummary';
import CardChartSummary from './layouts/CardChartSummary'

import { db } from '../firebase';
import withAuthorization from './withAuthorization';
import { USERS_SET, PRODUCTDETAILS_SET, CURRENT_PAGE_SET, PRODUCTS_SET } from '../constants/action-types';

const styles = theme => ({
});

class DashboardPage extends Component {
    constructor() {
        super();

        this.state = {
            productCapacity: 0,
            productRating: 0,
            downloaded: 0,
            subDownloaded: '',
            activeAccount: 0,
            totalAccount: 0
        }

        this.calculateUserData = this.calculateUserData.bind(this);
        this.calculateProductData = this.calculateProductData.bind(this);
        this.calculateProductDetailData = this.calculateProductDetailData.bind(this);
    }

    componentDidMount() {
        const { onSetUsers, onSetProductDetails, onSetCurrentPage, onSetProducts } = this.props;

        onSetCurrentPage('Dashboard');

        db.user.onGetUsers(snapshot => {
            const users = snapshot.val();

            onSetUsers(users);
            this.calculateUserData(users);
        });
        db.productDetail.onGetProductDetails(snapshot => {
            const productDetails = snapshot.val();

            onSetProductDetails(productDetails);
            this.calculateProductDetailData(productDetails);
        });
        db.product.onGetProducts(snapshot => {
            const products = snapshot.val();

            onSetProducts(products);
            this.calculateProductData(products);
        });
    }

    calculateUserData(users) {
        let activeAccount = 0;
        let totalAccount = 0;

        Object.values(users).forEach(item => {
            if (item.status === 1) activeAccount++;
            totalAccount++;
        });

        this.setState(state => ({
            ...state,
            activeAccount,
            totalAccount
        }));
    }

    calculateProductDetailData(productDetails) {
        let productCapacity = 0;
        let downloaded = 0;

        Object.values(productDetails).forEach(item => {
            if (item.capacity) productCapacity += item.capacity;
            if (item.downloaded) downloaded += item.downloaded;
        });

        productCapacity = this.convertKBtoGB(productCapacity);

        this.setState(state => ({
            ...state,
            productCapacity,
            downloaded
        }));
    }

    calculateProductData(products) {
        let productRating = 0;

        Object.values(products).forEach(item => {
            if (item.rating) productRating += item.rating;
        });

        productRating /= Object.keys(products).length;

        this.setState(state => ({
            ...state,
            productRating: productRating.toFixed(1)
        }));
    }

    convertKBtoGB(capacity) {
        return (capacity / 1024 / 1024).toFixed(2);
    }

    convertNumberToString(nb) {
        let count = 0;
        let number = parseInt(nb);
        let sub = '';

        do {
            number /= 1000;
            count++;
        } while (number > 999);

        switch (count) {
            case 1:
                sub = 'K';
                break;
            case 2:
                sub = 'M';
                break;
            case 3:
                sub = 'B';
                break;
            case 4:
                sub = 'T';
                break;
        }

        return {
            number: number.toFixed(0),
            sub
        }
    }

    render() {
        const { classes } = this.props;

        const downloaded = this.convertNumberToString(this.state.downloaded);

        return (
            <React.Fragment>
                <CardSummary
                    productCapacity={this.state.productCapacity}
                    productRating={this.state.productRating}
                    downloaded={downloaded.number}
                    subDownloaded={downloaded.sub}
                    activeAccount={this.state.activeAccount}
                    totalAccount={this.state.totalAccount}
                />
                <CardChartSummary />
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state) => ({
    productDetails: state.productDetailState.productDetails,
    users: state.userState.users,
    products: state.productState.products
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentPage: (currentPage) => dispatch({ type: CURRENT_PAGE_SET, currentPage }),
    onSetUsers: (users) => dispatch({ type: USERS_SET, users }),
    onSetProductDetails: (productDetails) => dispatch({ type: PRODUCTDETAILS_SET, productDetails }),
    onSetProducts: (products) => dispatch({ type: PRODUCTS_SET, products })
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(DashboardPage);
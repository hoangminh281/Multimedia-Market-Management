import _ from 'lodash';
import moment from 'moment';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/';

import CardSummary from './layouts/CardSummary';
import CardChartSummary from './layouts/CardChartSummary'

import { db } from '../firebase';
import withAuthorization from './withAuthorization';
import { USERS_SET, PRODUCTDETAILS_SET, CURRENT_PAGE_SET, PRODUCTS_SET, PURCHASED_PRODUCT_SET, RECHARGED_HISTORY_SET } from '../constants/action-types';

const styles = theme => ({
    fullWidth: {
        width: '100%'
    }
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
            totalAccount: 0,
            purchasedProductStatistics: {},
            rechargedHistoryStatistics: {}
        }

        this.retrieveUserData = this.retrieveUserData.bind(this);
        this.retrieveProductData = this.retrieveProductData.bind(this);
        this.retrieveProductDetailData = this.retrieveProductDetailData.bind(this);
        this.calculateUserData = this.calculateUserData.bind(this);
        this.calculateProductData = this.calculateProductData.bind(this);
        this.calculateProductDetailData = this.calculateProductDetailData.bind(this);
        this.retrievePurchasedProduct = this.retrievePurchasedProduct.bind(this);
        this.preparePurchasedProductData = this.preparePurchasedProductData.bind(this);
        this.retrieveRechargedHistory = this.retrieveRechargedHistory.bind(this);
    }

    componentDidMount() {
        const { onSetCurrentPage } = this.props;

        onSetCurrentPage('Dashboard');

        this.retrieveUserData();
        this.retrieveProductData();
        this.retrieveProductDetailData();
        this.retrievePurchasedProduct();
        this.retrieveRechargedHistory();
    }

    retrieveUserData() {
        db.user.onGetUsers(snapshot => {
            const users = snapshot.val();

            this.props.onSetUsers(users);
            this.calculateUserData(users);
        });
    }

    retrieveProductData() {
        db.product.onGetProducts(snapshot => {
            const products = snapshot.val();

            this.props.onSetProducts(products);
            this.calculateProductData(products);
        });
    }

    retrieveProductDetailData() {
        db.productDetail.onGetProductDetails(snapshot => {
            const productDetails = snapshot.val();

            this.props.onSetProductDetails(productDetails);
            this.calculateProductDetailData(productDetails);
        });
    }

    retrievePurchasedProduct() {
        db.purchasedProduct.onceGetPurchasedProducts().then(snapshot => {
            const purchasedProducts = snapshot.val();

            this.props.onSetPurchasedProducts(purchasedProducts);
            this.preparePurchasedProductData(purchasedProducts);
        });
    }

    retrieveRechargedHistory() {
        db.rechargeHistory.onceGetRechargedHistories().then(snapshot => {
            const RechargedHistories = snapshot.val();

            this.props.onSetRechargedHistories(RechargedHistories);
            this.prepareRechargedHistorytData(RechargedHistories);
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

    preparePurchasedProductData(purchasedProducts) {
        let purchasedProductStatistics = this.initData30daysAgo();

        Object.values(purchasedProducts).forEach(user => {
            //User layer
            Object.values(user).forEach(productCategory => {
                //Product category layer
                Object.values(productCategory).forEach(purchasedProduct => {
                    //Purchased product layer
                    const purchasedProductTimer = moment(purchasedProduct.dateTime, 'DD/MM/YYYY - hh:mm:ss');

                    if (moment().diff(purchasedProductTimer, "months") === 0) {
                        const purchasedProductDay = purchasedProductTimer.date().toString();
                        const purchasedProductMonth = purchasedProductTimer.month().toString();

                        if (purchasedProductDay === '1') {
                            const index = purchasedProductStatistics.labels.indexOf(purchasedProductDay + '/' + purchasedProductMonth);

                            purchasedProductStatistics.series[0][index]++;
                        } else {
                            const index = purchasedProductStatistics.labels.indexOf(purchasedProductDay);

                            purchasedProductStatistics.series[0][index]++;
                        }
                    }
                });
            });
        });

        this.setState(state => ({
            ...state,
            purchasedProductStatistics
        }));
    }

    prepareRechargedHistorytData(rechargedHistories) {
        let rechargedHistoryStatistics = this.initData30daysAgo();

        Object.values(rechargedHistories).forEach(user => {
            //User layer
            Object.values(user).forEach(rechargedHistory => {
                //Recharged history layer
                const purchasedProductTimer = moment(rechargedHistory.time, 'DD/MM/YYYY - hh:mm:ss');

                if (moment().diff(purchasedProductTimer, "months") === 0) {
                    const purchasedProductDay = purchasedProductTimer.date().toString();
                    const purchasedProductMonth = purchasedProductTimer.month().toString();

                    if (purchasedProductDay === '1') {
                        const index = rechargedHistoryStatistics.labels.indexOf(purchasedProductDay + '/' + purchasedProductMonth);

                        rechargedHistoryStatistics.series[0][index]++;
                    } else {
                        const index = rechargedHistoryStatistics.labels.indexOf(purchasedProductDay);

                        rechargedHistoryStatistics.series[0][index]++;
                    }
                }
            });
        });

        this.setState(state => ({
            ...state,
            rechargedHistoryStatistics
        }));
    }

    initData30daysAgo() {
        let purchasedProductStatistics = {
            labels: [],
            series: [[]]
        };

        for (let i = 29; i > -1; i--) {
            const pastDay = moment().subtract(i, 'days').date().toString();
            const pastMonth = moment().subtract(i, 'days').month().toString();

            if (pastDay === '1') {
                purchasedProductStatistics.labels.push(pastDay + '/' + pastMonth);
            } else {
                purchasedProductStatistics.labels.push(pastDay);
            }
            purchasedProductStatistics.series[0].push(0);
        }

        return purchasedProductStatistics;
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
            <div className={classes.fullWidth}>
                <CardSummary
                    productCapacity={this.state.productCapacity}
                    productRating={this.state.productRating}
                    downloaded={downloaded.number}
                    subDownloaded={downloaded.sub}
                    activeAccount={this.state.activeAccount}
                    totalAccount={this.state.totalAccount}
                />
                <CardChartSummary
                    purchasedProductStatistics={this.state.purchasedProductStatistics}
                    rechargedHistoryStatistics={this.state.rechargedHistoryStatistics}
                />
            </div>
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
    onSetProducts: (products) => dispatch({ type: PRODUCTS_SET, products }),
    onSetPurchasedProducts: (purchasedProducts) => dispatch({ type: PURCHASED_PRODUCT_SET, purchasedProducts }),
    onSetRechargedHistories: (rechargedHistories) => dispatch({ type: RECHARGED_HISTORY_SET, rechargedHistories })
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(DashboardPage);
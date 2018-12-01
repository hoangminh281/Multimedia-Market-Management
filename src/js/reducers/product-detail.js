import { PRODUCTDETAILS_SET, PRODUCTDETAIL_SET, PRODUCTDETAIL_REMOVE } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    productDetails: {},
};

const applySetProductDetails = (state, action) => ({
    ...state,
    productDetails: action.productDetails
});

const applySetProductDetail = (state, action) => ({
    ...state,
    productDetails: Object.assign({}, action.productDetails, state.productDetails)
});

const applyRemoveProductDetail = (state, action) => ({
    ...state,
    productDetails: _.omit(state.productDetails, action.productDetailId)
});

function productDetailReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PRODUCTDETAILS_SET: {
            return applySetProductDetails(state, action);
        }
        case PRODUCTDETAIL_SET: {
            return applySetProductDetail(state, action);
        }
        case PRODUCTDETAIL_REMOVE: {
            return applyRemoveProductDetail(state, action);
        }
        default: return state;
    }
}

export default productDetailReducer;
import { PURCHASED_PRODUCT_SET } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    purchasedProducts: {},
};

const applySetPurchasedProducts = (state, action) => ({
    ...state,
    purchasedProducts: action.purchasedProducts
});

function purchasedProductReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PURCHASED_PRODUCT_SET: {
            return applySetPurchasedProducts(state, action);
        }
        default: return state;
    }
}

export default purchasedProductReducer;
import { PRODUCTS_SET, PRODUCT_SET, PRODUCT_REMOVE } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    products: {},
};

const applySetProducts = (state, action) => ({
    ...state,
    products: action.products
});

const applySetProduct = (state, action) => ({
    ...state,
    products: Object.assign({}, action.product, state.products)
});

const applyRemoveProduct = (state, action) => ({
    ...state,
    products: _.omit(state.products, action.productId)
})

function productReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PRODUCTS_SET: {
            return applySetProducts(state, action);
        }
        case PRODUCT_SET: {
            return applySetProduct(state, action);
        }
        case PRODUCT_REMOVE: {
            return applyRemoveProduct(state, action);
        }
        default: return state;
    }
}

export default productReducer;
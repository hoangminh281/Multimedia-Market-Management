import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import roleReducer from './role';
import productReducer from './product';
import categoryReducer from './category'
import productDetailReducer from './product-detail'
import cardReducer from './card';
import purchasedProductReducer from './purchased-product';
import rechargedHistoryReducer from './recharged-history';
import animationReducer from './animation';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    roleState: roleReducer,
    productState: productReducer,
    categoryState: categoryReducer,
    productDetailState: productDetailReducer,
    cardState: cardReducer,
    purchasedProductState: purchasedProductReducer,
    rechargedHistoryState: rechargedHistoryReducer,
    animationState: animationReducer
});

export default rootReducer;
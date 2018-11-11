import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import roleReducer from './role';
import productReducer from './product';
import categoryReducer from './category'
import productDetailReducer from './product-detail'

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    roleState: roleReducer,
    productState: productReducer,
    categoryState: categoryReducer,
    productDetailState: productDetailReducer,
});

export default rootReducer;
import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import roleReducer from './role';
import productReducer from './product';
import categoryReducer from './category'

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    roleState: roleReducer,
    productState: productReducer,
    categoryState: categoryReducer,
});

export default rootReducer;
import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import roleReducer from './role';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    roleState: roleReducer,
});

export default rootReducer;
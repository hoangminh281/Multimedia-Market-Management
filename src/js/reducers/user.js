import { USER_SET, USERS_SET, USER_REMOVE } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    users: {},
};

const applySetUsers = (state, action) => ({
    ...state,
    users: action.users
});

const applySetUser = (state, action) => ({
    ...state,
    users: Object.assign({}, action.user, state.users)
});

const applyRemoveUser = (state, action) => ({
    ...state,
    users: _.omit(state.users, action.userId)
})

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USERS_SET: {
            return applySetUsers(state, action);
        }
        case USER_SET: {
            return applySetUser(state, action);
        }
        case USER_REMOVE: {
            return applyRemoveUser(state, action);
        }
        default: return state;
    }
}

export default userReducer;
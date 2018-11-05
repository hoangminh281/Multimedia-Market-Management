import { USER_SET, USERS_SET } from '../constants/action-types';

const INITIAL_STATE = {
    users: {},
};

const applySetUsers = (state, action) => ({
    ...state,
    users: action.users
});

const applySetUser = (state, action) => ({
    ...state,
    users: [
        ...users,
        action.user
    ]
});

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USERS_SET: {
            return applySetUsers(state, action);
        }
        case USER_SET: {
            return applySetUser(state, action);
        }
        default: return state;
    }
}

export default userReducer;
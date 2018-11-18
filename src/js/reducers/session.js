import { AUTH_USER_SET, CURRENT_PAGE_SET } from '../constants/action-types';

const INITIAL_STATE = {
    authUser: null,
    currentPage: '',
};

const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser
});

const applySetCurrentPage = (state, action) => ({
    ...state,
    currentPage: action.currentPage
});

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER_SET: {
            return applySetAuthUser(state, action);
        }
        case CURRENT_PAGE_SET: {
            return applySetCurrentPage(state, action);
        }
        default: return state;
    }
}

export default sessionReducer;
import { ROLES_SET } from '../constants/action-types';

const INITIAL_STATE = {
    roles: {},
};

const applySetRoles = (state, action) => ({
    ...state,
    roles: action.roles
});

function roleReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ROLES_SET: {
            return applySetRoles(state, action);
        }
        default: return state;
    }
}

export default roleReducer;
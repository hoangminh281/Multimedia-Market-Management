import { RECHARGED_HISTORY_SET } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    rechargedHistories: {},
};

const applySetRechargedHistories = (state, action) => ({
    ...state,
    rechargedHistories: action.rechargedHistories
});

function rechargedHistoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECHARGED_HISTORY_SET: {
            return applySetRechargedHistories(state, action);
        }
        default: return state;
    }
}

export default rechargedHistoryReducer;
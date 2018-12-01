import { ANIMATION_SET } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    isAnimation: false,
};

const applySetCards = (state, action) => ({
    ...state,
    isAnimation: !state.isAnimation,
});

function animationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ANIMATION_SET: {
            return applySetCards(state);
        }
        default: return state;
    }
}

export default animationReducer;
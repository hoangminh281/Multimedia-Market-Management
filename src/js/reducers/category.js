import { CATEGORIES_SET } from '../constants/action-types';

const INITIAL_STATE = {
    categories: {},
};

const applySetCategories = (state, action) => ({
    ...state,
    categories: action.categories
});

function categoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CATEGORIES_SET: {
            return applySetCategories(state, action);
        }
        default: return state;
    }
}

export default categoryReducer;
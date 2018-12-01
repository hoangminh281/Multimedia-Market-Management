import { CARD_SET, CARDS_SET, CARD_REMOVE } from '../constants/action-types';
import _ from 'lodash';

const INITIAL_STATE = {
    cards: {},
};

const applySetCards = (state, action) => ({
    ...state,
    cards: action.cards
});

const applySetCard = (state, action) => ({
    ...state,
    cards: Object.assign({}, action.card, state.cards)
});

const applyRemoveCard = (state, action) => ({
    ...state,
    cards: _.omit(state.cards, action.cardId)
});

function cardReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CARDS_SET: {
            return applySetCards(state, action);
        }
        case CARD_SET: {
            return applySetCard(state, action);
        }
        case CARD_REMOVE: {
            return applyRemoveCard(state, action);
        }
        default: return state;
    }
}

export default cardReducer;
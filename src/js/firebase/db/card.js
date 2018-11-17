import { db } from '../firebase';

export const doCreateOrUpdateCard = (cardId, category, value, number, seri, status) =>
    db.ref(`cards/${category}/${value}/${cardId}`).set({
        cardId,
        category,
        number,
        seri,
        status,
        value
    });

export const doDeleteCard = (cardId, category, value) =>
    db.ref(`cards/${category}/${value}/${cardId}`).remove();

export const onceGetCards = () =>
    db.ref('cards').once('value');

export const onGetCards = (callback) =>
    db.ref('cards').on('value', callback);

export const onCreateCardKey = (category, value) =>
    db.ref(`cards/${category}/${value}`).push().key;
import { db } from '../firebase';

export const onceGetPurchasedProducts = () =>
    db.ref('purchased_product').once('value');

export const onGetPurchasedProducts = (callback) =>
    db.ref('purchased_product').on('value', callback);
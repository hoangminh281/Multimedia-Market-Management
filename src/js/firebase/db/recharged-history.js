import { db } from '../firebase';

export const onceGetRechargedHistories = () =>
    db.ref('recharge_histories').once('value');

export const onGetRechargedHistories = (callback) =>
    db.ref('recharge_histories').on('value', callback);
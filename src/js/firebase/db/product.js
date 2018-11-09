import { db } from '../firebase';

export const doCreateOrUpdateProduct = (id, name, email, balance, birthday, image, phone, role, sex, status) =>
    db.ref(`products/${id}`).set({
        id,
        name,
        email,
        balance,
        birthday,
        image,
        phone,
        role,
        sex,
        status
    });

export const doDeleteProduct = (id) =>
    db.ref(`products/${id}`).remove();

export const onceGetProducts = () =>
    db.ref('products').once('value');

export const onGetProducts = (callback) =>
    db.ref('products').on('value', callback);

export const onCreateProductKey = () =>
    db.ref('products').push().key;
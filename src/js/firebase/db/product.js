import { db } from '../firebase';

export const doCreateOrUpdateProduct = (productId, title, price, cateId, photoId, rating, status) =>
    db.ref(`products/${id}`).set({
        productId,
        title,
        price,
        cateId,
        photoId,
        rating,
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
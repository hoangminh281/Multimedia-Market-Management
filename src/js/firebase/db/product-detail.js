import { db } from '../firebase';

export const doCreateOrUpdateProductDetail = (id, ageLimit, capacity, intro, description, imageIdlist, ownerId, videoId) =>
    db.ref(`product_detail/${id}`).set({
        id, 
        ageLimit, 
        capacity, 
        intro, 
        description, 
        imageIdlist, 
        ownerId, 
        videoId
    });

export const doDeleteProductDetail = (id) =>
    db.ref(`product_detail/${id}`).remove();

export const onceGetProductDetails = () =>
    db.ref('product_detail').once('value');

export const onGetProductDetails = (callback) =>
    db.ref('product_detail').on('value', callback);

export const onCreateProductDetailKey = () =>
    db.ref('product_detail').push().key;
import { db } from '../firebase';

export const doCreateOrUpdateProductDetail = (id, ageLimit, capacity, buyCount, intro, description, imageIdList, ownerId, videoId) =>
    db.ref(`product_detail/${id}`).set({
        id,
        ageLimit,
        capacity,
        buyCount,
        intro,
        description,
        imageIdList,
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

export const onceGetProductDetail = (id) =>
    db.ref(`product_detail/${id}`).once('value');
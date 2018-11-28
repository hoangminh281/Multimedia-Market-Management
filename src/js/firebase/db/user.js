import { db } from '../firebase';

export const doCreateOrUpdateUser = (id, name, email, balance, birthday, image, phone, role, sex, status) =>
    db.ref(`users/${id}`).set({
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

export const doDeleteUser = (id) =>
    db.ref(`users/${id}`).remove();

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onGetUsers = (callback) =>
    db.ref('users').on('value', callback);

export const onGetUser = (id, callback) =>
    db.ref(`users/${id}`).on('value', callback);

export const onceGetUser = (id) =>
    db.ref(`users/${id}`).once('value');

export const onCreateUserKey = () =>
    db.ref('users').push().key;

export const getUserRef = (id) =>
    db.ref(`users/${id}`);
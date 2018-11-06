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

export const onCreateUserKey = () =>
    db.ref('users').push().key;
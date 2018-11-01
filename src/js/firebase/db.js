import { db } from './firebase';

//User API

export const doCreateUser = (id, username, email) =>
    db.ref('users/${id}').set({
        name,
        email,
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

//Other Entity APIs ...
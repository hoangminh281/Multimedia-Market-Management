import { db } from '../firebase';

//User API

export const doCreateUser = (id, name, email) =>
    db.ref(`users/{id}`).set({
        id,
        name,
        email,
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

//Other Entity APIs ...
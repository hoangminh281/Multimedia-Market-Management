import { db } from '../firebase';

export const onceGetRoles = () =>
    db.ref('roles').once('value');

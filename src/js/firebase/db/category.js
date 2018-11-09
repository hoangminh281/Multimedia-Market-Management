import { db } from '../firebase';

export const onceGetCategories = () =>
    db.ref('categories').once('value');

import { storage } from './firebase';

const storageRef = storage.ref();

export const doGetProductDownloadURL = (id) =>
  storageRef.child(`products/${id}`).getDownloadURL();

export const doGetUserDownloadURL = (id) =>
  storageRef.child(`users/${id}`).getDownloadURL();

export const doGetFileDownloadURL = (id) =>
  storageRef.child(`files/${id}`).getDownloadURL();
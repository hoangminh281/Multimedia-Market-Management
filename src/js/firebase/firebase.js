import firebase from 'firebase/app';
import 'firebase/auth';

export const config = {
    apiKey: "AIzaSyARlDHxSRWzipqSfA8qq-YSIZ-V7M9Wr20",
    authDomain: "fir-2-3605b.firebaseapp.com",
    databaseURL: "https://fir-2-3605b.firebaseio.com",
    projectId: "fir-2-3605b",
    storageBucket: "fir-2-3605b.appspot.com",
    messagingSenderId: "121266047755"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyAtCECHVAFh5AF6-Bjqr3d5b_YY_OKqePY",

    authDomain: "summit-notes.firebaseapp.com",

    projectId: "summit-notes",

    storageBucket: "summit-notes.appspot.com",

    messagingSenderId: "1026052119181",

    appId: "1:1026052119181:web:4e2a7b67207e6195a060c4",

    measurementId: "G-WVT8MXFY6F"

};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

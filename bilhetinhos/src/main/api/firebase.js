import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'
import 'firebase/functions'

var config = {
    apiKey: "AIzaSyBGgOX_REap1yFQlTIlgPAErOqo66xbVbE",
    authDomain: "projeto-teste-cbe9a.firebaseapp.com",
    databaseURL: "https://projeto-teste-cbe9a.firebaseio.com",
    projectId: "projeto-teste-cbe9a",
    storageBucket: "projeto-teste-cbe9a.appspot.com",
    messagingSenderId: "957489901010"
};

firebase.initializeApp(config);

export default firebase
// This import loads the firebase namespace.
import firebase from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyBGgOX_REap1yFQlTIlgPAErOqo66xbVbE",
    authDomain: "projeto-teste-cbe9a.firebaseapp.com",
    databaseURL: "https://projeto-teste-cbe9a.firebaseio.com",
    projectId: "projeto-teste-cbe9a",
    storageBucket: "projeto-teste-cbe9a.appspot.com",
    messagingSenderId: "957489901010"
};

console.log('loading firebase')

firebase.initializeApp(config);

console.log(firebase)

export default firebase
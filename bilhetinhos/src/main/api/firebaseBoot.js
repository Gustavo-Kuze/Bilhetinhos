
import firebase from 'firebase/app';
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

firebase.initializeApp(config);

const initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var uid = user.uid;
            // var phoneNumber = user.phoneNumber;
            // var providerData = user.providerData;
            // user.getIdToken().then(function (accessToken) {
            //     document.getElementById('sign-in-status').textContent = 'Signed in';
            //     document.getElementById('sign-in').textContent = 'Sign out';
            //     document.getElementById('account-details').textContent = JSON.stringify({
            //         displayName: displayName,
            //         email: email,
            //         emailVerified: emailVerified,
            //         phoneNumber: phoneNumber,
            //         photoURL: photoURL,
            //         uid: uid,
            //         accessToken: accessToken,
            //         providerData: providerData
            //     }, null, '  ');
            // });
        } else {
            // User is signed out.
            // document.getElementById('sign-in-status').textContent = 'Signed out';
            // document.getElementById('sign-in').textContent = 'Sign in';
            // document.getElementById('account-details').textContent = 'null';
        }
    }, function (error) {
        // console.log(error);
    });
};


window.addEventListener('load', function () {
    initApp()
});


export default {firebase}
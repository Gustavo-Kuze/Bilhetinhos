import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class Login extends Component {
    componentDidMount() {
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            // tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            // privacyPolicyUrl: function () {
            //     window.location.assign('<your-privacy-policy-url>');
            // }
        };
        
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig); 
    }
    
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <div id="firebaseui-auth-container"></div>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}




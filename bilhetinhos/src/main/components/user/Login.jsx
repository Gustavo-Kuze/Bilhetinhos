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
                        <div className="col-10 offset-1 d-flex justify-content-center align-items-center flex-column">
                            <div id="firebaseui-auth-container"></div>
                            <p>Ainda não tem uma conta?</p>
                            <a href="/user/signup" className="text-decoration-none text-center text-light firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button d-flex justify-content-center align-items-center"><span>Criar</span></a>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}




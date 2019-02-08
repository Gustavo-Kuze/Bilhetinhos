import firebase from 'firebase/app'
import 'firebase/auth'

import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'
import { login } from "../../redux/actions/loginActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class Login extends Component {
    componentDidMount() {
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
            // ,tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            // tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            // privacyPolicyUrl: function () {
            //     window.location.assign('<your-privacy-policy-url>')
            // }
        }

        var ui = new firebaseui.auth.AuthUI(firebase.auth())

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig)

        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    user.getIdToken().then(accessToken => {
                        this.props.login({
                            email: user.email,
                            uid: user.uid,
                            accessToken
                        })
                    })
                }
            },
            error => {
                console.log(error)
            }
        )
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



const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Login)
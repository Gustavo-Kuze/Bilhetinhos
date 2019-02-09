import firebase from '../../api/firebase'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'
import { changeUserLogState } from "../../redux/actions/userActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { callbackWithUserAndAccessToken } from '../../api/firebaseAuth'

class Login extends Component {

    state = {
        isLoggedOut: true
    }

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

        // firebase.auth().onAuthStateChanged(
        //     user => {
        //         if (user) {
        //             this.setState({isLoggedOut: false})
        //             user.getIdToken().then(accessToken => {
        //                 this.props.changeUserLogState({
        //                     email: user.email,
        //                     uid: user.uid,
        //                     accessToken
        //                 })
        //             })
        //         }
        //     },
        //     error => {
        //         console.log(error)
        //     }
        // )
        callbackWithUserAndAccessToken((user, accessToken) => {
            this.props.changeUserLogState({
                email: user.email,
                uid: user.uid,
                accessToken
            })
        })
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1 d-flex justify-content-center align-items-center flex-column">
                            <div id="firebaseui-auth-container"></div>
                            <If condition={this.state.isLoggedOut}>
                                <p>Ainda não tem uma conta?</p>
                                <a href="/user/signup" className="text-decoration-none text-center text-light firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button d-flex justify-content-center align-items-center"><span>Criar</span></a>
                            </If>
                            <If condition={!this.state.isLoggedOut}>
                                <Spinner sr="Entrando..." />
                            </If>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeUserLogState }, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Login)
import firebase from '../../api/firebase'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import { changeUserLogState } from "../../redux/actions/userActions"
import { changePictureDownloadUrl } from '../../redux/actions/cachedActions'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { registerUser } from '../../api/users'

class Login extends Component {

    state = {
        isLoadingUi: true
    }

    signUpAndChangeState = (user) => {
        this.props.changeUserLogState({
            email: user.email,
            uid: user.uid,
            name: user.displayName
        })
    }

    LogInAndChangeState = (user) => {
        this.props.changeUserLogState({
            email: user.email,
            uid: user.uid,
            name: user.name,
            profilePic: user.profilePic,
            bio: user.bio,
            phone: user.phone,
            mates: user.mates ? user.mates.filter(m => m !== null) : []
        })
    }

    registerUserAndSaveState = async (authResult) => {
        this.signUpAndChangeState(authResult.user)
        return registerUser({
            email: authResult.user.email,
            uid: authResult.user.uid,
            name: authResult.user.displayName
        })
    }

    signInSuccessful = (authResult, redirectUrl) => {
        firebase.database().ref('users').once('value').then(userSnapshot => {
            if (!userSnapshot.hasChild(authResult.user.uid)) {

                this.registerUserAndSaveState(authResult).then(() => {
                    window.location.pathname = redirectUrl
                })
            } else {
                const userFromFirebase = userSnapshot.child(`${authResult.user.uid}`).val()
                this.LogInAndChangeState({ ...userFromFirebase, uid: authResult.user.uid })
                try {
                    firebase.storage().ref(userFromFirebase.profilePic).getDownloadURL().then(imageUrl => {
                        this.props.changePictureDownloadUrl(imageUrl)
                        window.location = redirectUrl
                    })
                } catch (err) {
                    console.log(err)
                    window.location = redirectUrl
                }
            }
        })
    }

    initializeFirebaseUi = () => {
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                uiShown: () => this.setState({ isLoadingUi: false }),
                signInSuccessWithAuthResult: this.signInSuccessful
            }
        }

        var ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
    }

    componentDidMount() {
        this.initializeFirebaseUi()
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row pt-5 mt-5">
                        <div className="col-10 offset-1 d-flex justify-content-center align-items-center flex-column">
                            <div id="firebaseui-auth-container"></div>
                            <If condition={false}>
                                <p>Ainda não tem uma conta?</p>
                                <a href="/user/signup" className="text-decoration-none text-center text-light firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button d-flex justify-content-center align-items-center"><span>Criar</span></a>
                            </If>
                            <If condition={this.state.isLoadingUi}>
                                <Spinner sr="Entrando..." />
                            </If>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeUserLogState, changePictureDownloadUrl }, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Login)
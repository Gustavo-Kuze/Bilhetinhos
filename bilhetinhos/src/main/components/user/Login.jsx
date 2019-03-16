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
            matesUids: user.mates ? user.mates.filter(m => m !== null) : [],
            boardPrivacy: user.boardPrivacy || 'public'
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
                    window.location = this.generateSignInSuccessUrl()
                })
            } else {
                const userFromFirebase = userSnapshot.child(`${authResult.user.uid}`).val()
                this.LogInAndChangeState({ ...userFromFirebase, uid: authResult.user.uid })
                this.props.changePictureDownloadUrl(userFromFirebase.profilePic)
                window.location = this.generateSignInSuccessUrl()
            }
        })
    }

    generateSignInSuccessUrl = () => {
        let url = new URL(window.location)
        url.search = ''
        url.pathname = '/noteboard'
        return url
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

const mapDispatchToProps = dispatch => bindActionCreators({
    changeUserLogState, changePictureDownloadUrl
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Login)
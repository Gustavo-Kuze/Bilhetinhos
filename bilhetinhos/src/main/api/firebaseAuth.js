// import firebase from 'firebase/app'
// import 'firebase/auth'
import firebase from './firebaseBoot'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const onAuthStateChange = callback => {
    firebase.auth().onAuthStateChanged(user => callback(user))
}

const callbackWithUserAndAccessToken = callback => {
    onAuthStateChange(user => {
        try {
            user.getIdToken().then(accessToken => {
                callback(user, accessToken)
            })
        } catch (err) {
            console.log(err)
        }
    })
}

export { onAuthStateChange, callbackWithUserAndAccessToken }

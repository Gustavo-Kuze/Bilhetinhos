import firebase from './firebase'
const getUsers = (uid) => {
    return firebase.database().ref('users/').child(uid)
}

const setUser = (user) => {
    return firebase.database().ref(`users/`).child(user.uid).set({
        email: user.email || '',
        accessToken: user.accessToken || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || []
    })
}

export {getUsers, setUser}
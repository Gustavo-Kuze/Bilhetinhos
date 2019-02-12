import firebase from './firebase'

const setUser = (user) => {
    return firebase.database().ref(`users/${user.uid}`).set({
        email: user.email || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || []
    })
}

const getUser = (uid) => {
    return firebase.database().ref('users/').child(uid)
}

// ainda não foi testado
const getMates = (uid) => {
    return new Promise((res, rej) => {
        let matesRef = firebase.database().ref(`users/${uid}/mates`)
        matesRef.once('value')
            .then((snapshot) => {
                let mates = snapshot.val() || []
                res({mates, matesRef})
            })
            .catch(err => {
                rej(err)
            })
    })

}

export { getUser, setUser, getMates }
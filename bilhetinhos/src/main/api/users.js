import firebase from './firebase'

const getUsersRef = () => firebase.database().ref('users/')

const getUserRefByUid = uid => getUsersRef().child(uid)

const getUserEmailByUid = async uid => {
    let userSnapshot = await getUserRefByUid(uid).once('value')
    return userSnapshot.val() ? userSnapshot.val().email : null
}

const getUserUidByEmail = async email => {
    let userUid = null
    let usersSnapshot = await getUsersRef().once('value')
    usersSnapshot.forEach(user => {
        if (user.val()) {
            if (user.val().email === email)
                userUid = user.key
        }
    })
    return userUid
}

const getUserByUid = uid => {
    return new Promise((res, rej) => {
        getUserRefByUid(uid).once('value', snapshot => {
            res(snapshot.val())
            rej(`User not found by uid: ${uid}`)
        }).catch(err => rej(err))
    })
}

const getUserByEmail = email => {
    return new Promise((res, rej) => {
        getUsersRef().once('value', snapshot => {
            snapshot.forEach(user => {
                if (user.val().email === email) {
                    res({
                        user: user.val(),
                        uid: user.key
                    })
                }
            })
            rej(`User not found by E-mail: ${email}`)
        }).catch(err => rej(err))
    })
}

const getUsersEmailsByUid = async (matesUids) => {
    let matesEmailsAndUids = []
    matesEmailsAndUids = Promise.all(matesUids.map(async (mate) => {
        let userRef = getUserRefByUid(mate)
        let userSnapshot = await userRef.once('value')
        return userSnapshot.val().email
    }))
    return matesEmailsAndUids
}

const getUsersUidsByEmail = async (matesEmails) => {
    let matesUidsAndEmail = []
    matesUidsAndEmail = Promise.all(matesEmails.map(async email => {
        let usersSnapshot = await getUsersRef().once('value')
        usersSnapshot.forEach(async user => {
            if (user.val().email === email)
                return user.key
        })
    }))
    return matesUidsAndEmail
}

const registerUser = async user => {
    return getUserRefByUid(user.uid).set({
        email: user.email || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || [],
        boardPrivacy: user.boardPrivacy || 'public'
    })

}

const isEmailRegistered = async email => {
    let emailProviders = await firebase.auth().fetchProvidersForEmail(email)
    return emailProviders.length > 0
}

const changeBoardPrivacy = async (uid, privacy) => {
    let userRef = getUserRefByUid(uid)
    let snapshot = await userRef.once('value')
    let user = snapshot.val()
    user.boardPrivacy = privacy
    await userRef.update(user)
}

export {
    getUserByEmail, getUserByUid, getUsersRef,
    registerUser, getUsersEmailsByUid, getUsersUidsByEmail,
    getUserUidByEmail, getUserEmailByUid, getUserRefByUid,
    isEmailRegistered, changeBoardPrivacy
}
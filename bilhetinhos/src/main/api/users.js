import firebase from './firebase'

const _getUsersRef = () => {
    return firebase.database().ref('users/')
}

const _getUserRefByUid = uid => {
    return _getUsersRef().child(uid)
}

const getUserEmailByUid = async uid => {
    let userSnapshot = await _getUserRefByUid(uid).once('value')
    return userSnapshot.val() ? userSnapshot.val().email : null
}

const getUserUidByEmail = async email => {
    let userUid = null
    let usersSnapshot = await _getUsersRef().once('value')
    usersSnapshot.forEach(async user => {
        if (user.val()) {
            if (user.val().email === email)
                userUid = user.key
        }
    })
    return userUid
}

const getUserByUid = uid => {
    return new Promise((res, rej) => {
        _getUserRefByUid(uid).once('value', snapshot => {
            snapshot.forEach(user => {
                if (user.key === uid) {
                    res({
                        user: user.val(),
                        uid: user.key
                    })
                }
            })
            rej(`Nenhum usuário encontrado com este Uid: ${uid}`)
        }).catch(err => rej(err))
    })
}

const getUserByEmail = email => {
    return new Promise((res, rej) => {
        _getUsersRef().once('value', snapshot => {
            snapshot.forEach(user => {
                if (user.val().email === email) {
                    res({
                        user: user.val(),
                        uid: user.key
                    })
                }
            })
            rej(`Nenhum usuário encontrado com este E-mail: ${email}`)
        }).catch(err => rej(err))
    })
}

const getMates = async uid => {
    try {
        let matesRef = _getUserRefByUid(uid).child('mates')
        let matesSnapshot = await matesRef.once('value')
        let mates = (matesSnapshot.val()) ? matesSnapshot.val().filter(m => m !== null) : []
        return { mates, matesRef }
    }
    catch (err) {
        throw new Error(err)
    }
}

const getUsersEmailsByUid = async (matesUids) => {
    let matesEmailsAndUids = []
    matesEmailsAndUids = Promise.all(matesUids.map(async (mate, index) => {
        let userRef = _getUserRefByUid(mate)
        let userSnapshot = await userRef.once('value')
        return userSnapshot.val().email
    }))

    return matesEmailsAndUids
}

const getUsersUidsByEmail = async (matesEmails) => {
    let matesUidsAndEmail = []
    matesUidsAndEmail = matesEmails.map(async email => {
        let usersSnapshot = await _getUsersRef().once('value')
        usersSnapshot.forEach(async user => {
            if (user.val().email === email)
                return user.key
        })
    })
    return matesUidsAndEmail
}

const isUserRegisteredOnDb = async (uid, passedUsersSnapshot) => {
    if (passedUsersSnapshot)
        return passedUsersSnapshot.hasChild(uid)

    let usersSnapshot = await _getUsersRef().once('value')
    return usersSnapshot.hasChild(uid)
}

const registerUser = user => {
    return _getUserRefByUid(user.uid).set({
        email: user.email || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || []
    })
}

export {
    getUserByEmail, getUserByUid,
    registerUser, getMates, getUsersEmailsByUid,
    isUserRegisteredOnDb, getUsersUidsByEmail, getUserUidByEmail,
    getUserEmailByUid
}
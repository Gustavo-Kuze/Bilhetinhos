import firebase from './firebase'

const _getUsersRef = () => {
    return firebase.database().ref('users/')
}

const _getUserRef = uid => {
    return _getUsersRef().child(uid)
}

const registerUser = user => {
    return _getUserRef(user.uid).set({
        email: user.email || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || []
    })
}

const getUserByUid = uid => {
    return new Promise((res, rej) => {
        _getUserRef(uid).once('value', snapshot => {
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

const getMates = (uid) => {
    return new Promise((res, rej) => {
        let matesRef = _getUserRef(uid).child('mates')
        matesRef.once('value')
            .then((snapshot) => {
                let mates = (snapshot.val()) ? snapshot.val().filter(m => m !== null) : []
                res({ mates, matesRef })
            })
            .catch(err => {
                rej(err)
            })
    })

}

const getMatesEmailsByUid = async (matesUids) => {
    let matesEmailsAndUids = []
    matesEmailsAndUids = matesUids.map(async (mate, index) => {
        let userRef = _getUserRef(mate)
        let userSnapshot = await userRef.once('value')
        return userSnapshot.val().email
    })

    return matesEmailsAndUids
}

const getMatesUidsByEmail = async (matesEmails) => {
    let matesUidsAndEmail = []
    matesUidsAndEmail = matesEmails.map(async email => {
        let usersSnapshot = await _getUsersRef().once('value')
        usersSnapshot.forEach(async user => {
            if(user.val().email === email)
                return user.key
        })
    })
    return matesUidsAndEmail
}

const isUserRegisteredOnDb = (uid, usersSnapshot) => {
    return new Promise((res) => {
        if (usersSnapshot) {
            res(usersSnapshot.hasChild(uid))
        }
        _getUsersRef().once('value').then(usersSnapshot => {
            res(usersSnapshot.hasChild(uid))
        })
    })
}

export {
    getUserByEmail, getUserByUid,
    registerUser, getMates, getMatesEmailsByUid,
    isUserRegisteredOnDb, getMatesUidsByEmail
}
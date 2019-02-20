import firebase from './firebase'

const getUsersRef = () => {
    return firebase.database().ref('users/')
}

const _getUserRefByUid = uid => {
    return getUsersRef().child(uid)
}

const getUserEmailByUid = async uid => {
    let userSnapshot = await _getUserRefByUid(uid).once('value')
    return userSnapshot.val() ? userSnapshot.val().email : null
}

const getUserUidByEmail = async email => {
    let userUid = null
    let usersSnapshot = await getUsersRef().once('value')
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
            res(snapshot.val())
            rej(`Nenhum usuário encontrado com este Uid: ${uid}`)
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
    matesEmailsAndUids = Promise.all(matesUids.map(async (mate) => {
        let userRef = _getUserRefByUid(mate)
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
    return _getUserRefByUid(user.uid).set({
        email: user.email || '',
        name: user.name || '',
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        phone: user.phone || '',
        mates: user.mates || []
    })

    // try {
    //     let data = await fetch('https://us-central1-projeto-teste-cbe9a.cloudfunctions.net/registerUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             uid: user.uid,
    //             user: {
    //                 name: user.displayName,
    //                 email: user.email
    //             }
    //         })
    //     })
    //     return data.json()
    // } catch (err) {
    //     return err
    // }
}

const removeMate = async (uid, mateUid) => {
    let getMatesResponse = await getMates(uid)
    if (getMatesResponse.mates.length > 0) {
        let mates = []
        mates = (getMatesResponse.mates.filter(mate => mate !== mateUid))
        getMatesResponse.matesRef.set(mates)
        return mates
    }
}

export {
    getUserByEmail, getUserByUid, getUsersRef,
    registerUser, getMates, getUsersEmailsByUid,
    getUsersUidsByEmail, getUserUidByEmail, getUserEmailByUid,
    removeMate
}

// getAllUsers
// fetch('https://us-central1-projeto-teste-cbe9a.cloudfunctions.net/getAllUsers')
// .then(data => data.json())
// .then(json => {
//     console.log(json)
// })
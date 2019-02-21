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
        getUserRefByUid(uid).once('value', snapshot => {
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
        mates: user.mates || []
    })

}

const isEmailRegistered = async email => {
    let emailProviders = await firebase.auth().fetchProvidersForEmail(this.state.mateEmail)
    return emailProviders.length > 0
}


export {
    getUserByEmail, getUserByUid, getUsersRef,
    registerUser, getUsersEmailsByUid, getUsersUidsByEmail,
    getUserUidByEmail, getUserEmailByUid, getUserRefByUid, isEmailRegistered
}

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

// getAllUsers
// fetch('https://us-central1-projeto-teste-cbe9a.cloudfunctions.net/getAllUsers')
// .then(data => data.json())
// .then(json => {
//     console.log(json)
// })
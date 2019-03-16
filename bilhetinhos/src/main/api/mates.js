import { getUserRefByUid, isEmailRegistered, getUserByEmail, getUsersRef } from './users'

const getMatesUidsAndReference = async uid => {
    try {
        let matesRef = getUserRefByUid(uid).child('mates')
        let matesSnapshot = await matesRef.once('value')
        let mates = (matesSnapshot.val()) ? matesSnapshot.val().filter(m => m !== null) : []
        return { mates, matesRef }
    }
    catch (err) {
        throw err
    }
}

const removeMate = async (uid, mateUid) => {
    let getMatesResponse = await getMatesUidsAndReference(uid)
    if (getMatesResponse.mates.length > 0) {
        let mates = []
        mates = (getMatesResponse.mates.filter(mate => mate !== mateUid))
        await getMatesResponse.matesRef.set(mates)
        return mates
    }
}

const addMateIfExists = async (uid, email, mateEmail, successCallback = null) => {
    let mateEmailExists = await isEmailRegistered(mateEmail)
    if (mateEmailExists) {
        let getMatesRes = await getMatesUidsAndReference(uid)
        if (mateEmail !== email) {
            let userByEmail = await getUserByEmail(mateEmail)
            if (!getMatesRes.mates.includes(userByEmail.uid)) {
                getMatesRes.mates.push(userByEmail.uid)
                await getMatesRes.matesRef.set(getMatesRes.mates)
                let successMsg = window.translate({ text: 'api-mates-added-successfully' })
                if (successCallback) successCallback(successMsg);
                return getMatesRes.mates
            } else {
                throw new Error(window.translate({ text: 'api-mates-error-mate-already-added' }))
            }
        } else {
            throw new Error(window.translate({ text: 'api-mates-error-cannot-add-yourself' }))
        }
    } else {
        throw new Error(window.translate({ text: 'api-mates-error-mate-not-found' }))
    }
}

const getMates = async uid => {
    let usersSnapshot = await getUsersRef().once('value')
    let matesAsync = []
    let usersSnapshotEntries = Object.entries(usersSnapshot.val())
    let matesUidsAndRef = await getMatesUidsAndReference(uid)
    try {
        matesAsync = await Promise.all(usersSnapshotEntries
            .filter(user => matesUidsAndRef.mates.includes(user[0]))
            .map(async user => {
                let mate = {
                    uid: user[0],
                    email: user[1].email,
                    name: user[1].name,
                    profilePic: user[1].profilePic,
                    coverPic: user[1].coverPic
                }

                return mate
            }))

        let mates = await Promise.all(matesAsync)
        return mates
    } catch (err) {
        throw new Error(err)
    }
}

const areMates = async (uid, mateUid) => {
    let response = await getMatesUidsAndReference(mateUid)
    return response.mates.includes(uid)
}

export { removeMate, getMatesUidsAndReference, addMateIfExists, getMates, areMates }
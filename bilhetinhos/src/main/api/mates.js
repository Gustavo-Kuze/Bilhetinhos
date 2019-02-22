import { getUserRefByUid, isEmailRegistered, getUserByEmail } from './users'

const getMates = async uid => {
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
    let getMatesResponse = await getMates(uid)
    if (getMatesResponse.mates.length > 0) {
        let mates = []
        mates = (getMatesResponse.mates.filter(mate => mate !== mateUid))
        getMatesResponse.matesRef.set(mates)
        return mates
    }
}

const addMateIfExists = async (uid, email, mateEmail, successCallback = null) => {
    let mateEmailExists = await isEmailRegistered(mateEmail)
    if (mateEmailExists) {
        let getMatesRes = await getMates(uid)
        if (mateEmail !== email) {
            let userByEmail = await getUserByEmail(mateEmail)
            if (!getMatesRes.mates.includes(userByEmail.uid)) {
                getMatesRes.mates.push(userByEmail.uid)
                let ok = await getMatesRes.matesRef.set(getMatesRes.mates)
                console.log(ok)
                let successMsg = 'Usuário adicionado à sua lista de colegas com sucesso.'
                if (successCallback) successCallback(successMsg);
                return getMatesRes.mates
            } else {
                throw new Error('O dono deste E-mail já é seu colega!')
            }
        } else {
            throw new Error('Você não pode se adicionar como colega.')
        }
    } else {
        throw new Error('Nenhum colega foi encontrado com este E-mail!')
    }
}

export { removeMate, getMates, addMateIfExists }
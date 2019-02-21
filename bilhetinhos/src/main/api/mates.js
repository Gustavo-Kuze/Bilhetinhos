import { getUserRefByUid, isEmailRegistered, getUserByEmail } from './users'

const getMates = async uid => {
    try {
        let matesRef = getUserRefByUid(uid).child('mates')
        let matesSnapshot = await matesRef.once('value')
        let mates = (matesSnapshot.val()) ? matesSnapshot.val().filter(m => m !== null) : []
        return { mates, matesRef }
    }
    catch (err) {
        throw new Error(err)
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
        getMates(uid).then((getMatesRes) => {
            if (mateEmail !== email) {
                getUserByEmail(mateEmail).then(userByEmail => {
                    if (!getMatesRes.mates.includes(userByEmail.uid)) {
                        getMatesRes.mates.push(userByEmail.uid)
                        getMatesRes.matesRef.set(getMatesRes.mates).then(ok => {
                            if (successCallback) successCallback();
                            return 'Usuário adicionado à sua lista de colegas com sucesso.'
                        })
                    } else {
                        return new Error('O dono deste E-mail já é seu colega!')
                    }
                }).catch(err => {
                    console.log('Erro interno: Não foi possível buscar o usuário pelo E-mail')
                    console.log(err)
                })
            } else {
                return new Error('Você não pode se adicionar como colega.')
            }
        })
    } else {
        return new Error('Nenhum colega foi encontrado com este E-mail!')
    }
}

export { removeMate, getMates, addMateIfExists }
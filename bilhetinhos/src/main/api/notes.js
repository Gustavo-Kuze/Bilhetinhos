import firebase from './firebase'
import {getMates} from './users'

const getUserNotes = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const getMateNotes = (uid, mateUid) => {
    return new Promise((res, rej) => {
        let matesNotes = []
        getMates(uid).then(matesObject => {
            matesObject.mates.child
            matesObject.mates.forEach(mateId => {
                firebase.database().ref(`notes/${mateId}/`).once('value').then(mateNotesSnapshot => {
                    matesNotes.concat(mateNotesSnapshot.val())
                    res(matesNotes)
                })
            });
        }).catch(err => rej(err))
    })
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

export {getUserNotes, getMateNotes, setNote}
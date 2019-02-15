import firebase from './firebase'
// import {getMates} from './users'

const getUserNotesRef = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const getMateNotesByUid = (uid, mateUid) => {
    return new Promise((res) => {
        let matesNotes = []
        firebase.database().ref(`notes/${mateUid}/`).once('value').then(mateNotesSnapshot => {
            mateNotesSnapshot.forEach(m => {
                if (m.hasChild('noteMates')) {

                    let noteMates = m.child('noteMates').val()
                    if (noteMates.includes(uid)) {
                        matesNotes.push(m)
                    }
                }
            })
            res(matesNotes)
        });
    })
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

export { getUserNotesRef, getMateNotesByUid, setNote }
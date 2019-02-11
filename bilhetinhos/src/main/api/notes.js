import firebase from './firebase'
const getUserNotes = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

export {getUserNotes, setNote}
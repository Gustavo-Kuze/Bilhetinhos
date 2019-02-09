import firebase from 'firebase/app';
 
import 'firebase/database';

const getNotes = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const setNote = (uid, note) => {
    firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
    return false;
}

export {getNotes, setNote}
import firebase from './firebase'
import {getUsersEmailsByUid} from './users'

const getUserNotesRef = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

const removeNote = (uid, noteTitle) => {
    return firebase.database().ref(`notes/`).child(uid).child(noteTitle).remove()
}

const getMateNotesByUid = async (uid, mateUid) => {
    let matesNotes = []
    let mateNotesSnapshot = await firebase.database().ref(`notes/${mateUid}/`).once('value')
    mateNotesSnapshot.forEach(m => {
        if (m.hasChild('noteMates')) {
            let noteMates = m.child('noteMates').val()
            if (noteMates.includes(uid)) {
                matesNotes.push(m.val())
            }
        }
    })
    return matesNotes
}

const getNoteWithMatesEmails = async (note) => {
    if (note.noteMates) {
        let noteMatesEmails = await getUsersEmailsByUid(note.noteMates)
        note.noteMates = noteMatesEmails
    }
    return note
}

const getUserNotes = async uid => {
    let notesSnapshot = await getUserNotesRef(uid).once('value')
    let notes = []
    notesSnapshot.forEach(note => {
        notes.push(note.val())
    })
    notes = await notes.map(async userNote => await getNoteWithMatesEmails(userNote))
    let userNotes = await Promise.all(notes)
    return userNotes
}

export { getUserNotesRef, getMateNotesByUid, setNote, removeNote, getUserNotes }
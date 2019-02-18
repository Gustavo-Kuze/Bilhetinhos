import firebase from './firebase'

const getUserNotesRef = (uid) => {
    return firebase.database().ref('notes/').child(uid)
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

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

const removeNote = (uid, noteTitle) => {
    return firebase.database().ref(`notes/`).child(uid).child(noteTitle).remove()
}

export { getUserNotesRef, getMateNotesByUid, setNote, removeNote }
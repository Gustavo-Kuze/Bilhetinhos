import firebase from './firebase'
import { getUsersEmailsByUid, getUserEmailByUid } from './users'

const getUserNotesRef = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

const removeNote = (uid, noteTitle) => {
    return firebase.database().ref(`notes/`).child(uid).child(noteTitle).remove()
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

const getMateNotes = async (uid, mateUid) => {
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

const generateMateNotesWithOwnerEmail = async (mate, mateNotes) => {
    return Promise.all(mateNotes.map(async mateNote => {
        let mateEmail = await getUserEmailByUid(mate)
        let note = await getNoteWithMatesEmails(mateNote)
        note = { ...note, owner: mateEmail }
        return note
    }))
}

const getAllMatesNotes = async (uid, matesUids) => {
    let matesNotes = []
    let matesNotesPromise = await Promise.all(matesUids.map(async mate => {
      let mateNotes = await getMateNotes(uid, mate)
      mateNotes = await generateMateNotesWithOwnerEmail(mate, mateNotes)
      return matesNotes.concat(mateNotes)
    }))
    return matesNotesPromise.filter(note => note.length > 0)
  }



export { getUserNotesRef, getMateNotes, setNote, removeNote, getUserNotes, getAllMatesNotes }
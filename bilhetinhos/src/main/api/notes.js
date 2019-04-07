import firebase from './firebase'
import { getUsersEmailsByUid, getUserEmailByUid } from './users'

const getNotesRef = () => firebase.database().ref('notes/')

const getUserNotesRef = uid => getNotesRef().child(uid)

const setNote = (uid, note) => {
    return getUserNotesRef(uid).child(note.title).set(note)
}

const removeNote = (uid, noteTitle) => {
    return getUserNotesRef(uid).child(noteTitle).remove()
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
    notes = await notes.map(async userNote => {
        let ownerEmail = await getUserEmailByUid(uid)
        let noteWithMatesEmails = await getNoteWithMatesEmails(userNote)
        let noteWithOwnerEmail = { ...noteWithMatesEmails, owner: ownerEmail }
        return noteWithOwnerEmail
    })
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

const likeToggle = async (noteTitle, uid, mateUid) => {
    let notes = await firebase.database().ref(`notes/${uid}`).once('value')
    let note = notes.val()[noteTitle]
    note.likes = note.likes ?
        { count: note.likes.count || 0, uids: note.likes.uids || [] } :
        { count: 0, uids: [] }
        
    if (note.likes.uids.includes(mateUid)) {
        note.likes.uids = note.likes.uids.filter(u => u !== mateUid)
    } else {
        note.likes.uids = [...note.likes.uids, mateUid]
    }

    note.likes.count = note.likes.uids.length

    setNote(uid, { ...note, likes: note.likes })
}

export {
    getUserNotesRef, getMateNotes, setNote,
    removeNote, getUserNotes, getAllMatesNotes,
    getNotesRef, likeToggle
}
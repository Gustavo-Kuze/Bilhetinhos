import firebase from './firebase'
import {getMates} from './users'

const getUserNotes = (uid) => {
    return firebase.database().ref('notes/').child(uid)
}

const getMateNotes = (uid, mateUid) => {
    return new Promise((res, rej) => {
        let matesNotes = []
        getMates(uid).then(matesObject => {
            // matesObject.mates
            // matesObject.mates.forEach(mateId => {
                // })
                firebase.database().ref(`notes/${mateUid}/`).once('value').then(mateNotesSnapshot => {
                    // matesNotes.concat(Array.from(Object.entries(mateNotesSnapshot.val())) )
                    mateNotesSnapshot.forEach(m => {
                        if(m.hasChild('noteMates')){
                            
                            let noteMates = m.child('noteMates').val()
                            if(noteMates.includes(uid)){
                                matesNotes.push(m)
                            }
                        }
                    })
                    res(matesNotes)
            });
        }).catch(err => rej(err))
    })
}

const setNote = (uid, note) => {
    return firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
}

export {getUserNotes, getMateNotes, setNote}
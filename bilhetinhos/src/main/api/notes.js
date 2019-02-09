
// This import loads the firebase namespace.
import firebase from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
import 'firebase/database';

const getNotes = (uid) => {
    return firebase.database().ref('notes/').child(uid)
    // dinos.on('value', (snapshot) => {
        // const tBody = document.getElementById('t-body')
        // tBody.innerHTML = ''
        // Object.entries(snapshot.val()).map(k => {
            // let tr = document.createElement('tr')
            // let tdName = document.createElement('td')
            // let tdHeight = document.createElement('td')
            // tdName.innerHTML = k[0]
            // tdHeight.innerHTML = k[1].height
            // tr.appendChild(tdName)
            // tr.appendChild(tdHeight)
            // tBody.appendChild(tr)
            // console.log('ta iterando')
            // console.log(k)
        // })
    // })
}

const setNote = (uid, note) => {
    firebase.database().ref(`notes/`).child(uid).child(note.title).set(note)
    return false;
}

export {getNotes, setNote}
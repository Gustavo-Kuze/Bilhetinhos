import firebase from './firebase'

export const getPictureUrl = imgPath => {
    firebase.storage().ref(imgPath)
    .getDownloadURL()
    .then((url) => {

    })

}


import firebase from './firebase'

const getNotificationsRef = () => firebase.database().ref('notifications/')

// const getUserNotifications = async (uid) => {
//     getNotificationsRef().child(uid).once('')
// }

export {getNotificationsRef}
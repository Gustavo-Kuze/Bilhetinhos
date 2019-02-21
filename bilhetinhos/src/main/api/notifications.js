import firebase from './firebase'

const _getUserNotificationsSnapshot = async uid => await getNotificationsRef().child(uid).once('value')

const getNotificationsRef = () => firebase.database().ref('notifications/')

const getUserNotifications = async (uid) => {
    let userNotificationsSnapshot = await _getUserNotificationsSnapshot(uid)
    return userNotificationsSnapshot.val()
}

const sendUserNotification = async (uid, notification) => {
    let notifications = (await getUserNotifications(uid)) || []
    notifications.push(notification)
    getNotificationsRef().child(uid).set(notifications)
}

const removeUserNotification = async (uid, notificationIndex) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        notifications.splice(notificationIndex, 1)
        getNotificationsRef().child(uid).set(notifications)
    }
}

const markAsRead = async (uid, notificationIndex) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        if(notifications[notificationIndex]){
            notifications[notificationIndex].read = true
            getNotificationsRef().child(uid).set(notifications)
        }
    }
}

export {
    getNotificationsRef, getUserNotifications, sendUserNotification,
    removeUserNotification, markAsRead
}
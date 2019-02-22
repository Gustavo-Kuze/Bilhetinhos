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

const removeUserNotification = async (uid, notification) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        notifications = notifications.filter(notif => notif.receivedDate !== notification.receivedDate)
        getNotificationsRef().child(uid).set(notifications)
    }
}

const markAsRead = async (uid, notification) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        notifications = notifications.map(notif => {
            if (notif.receivedDate === notification.receivedDate) {
                notif.read = true
            }
            return notif
        })
        getNotificationsRef().child(uid).set(notifications)
    }
}

const getUnreadNotifications = async uid => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        let unread = notifications.filter(notification => notification.read === false)
        return unread
    }
    return []
}

export {
    getNotificationsRef, getUserNotifications, sendUserNotification,
    removeUserNotification, markAsRead, getUnreadNotifications
}
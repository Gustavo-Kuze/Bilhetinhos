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

const removeUserNotifications = async (uid, receivedDates) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        notifications = notifications.filter(notif => {
            return !receivedDates.includes(`${notif.receivedDate}`)
        })
        await getNotificationsRef().child(uid).set(notifications)
    }
}

const markAsRead = async (uid, receivedDate) => {
    let notifications = (await getUserNotifications(uid)) || []
    if (notifications.length > 0) {
        notifications = notifications.map(notif => {
            if (`${notif.receivedDate}` === receivedDate) {
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
    removeUserNotifications, markAsRead, getUnreadNotifications
}
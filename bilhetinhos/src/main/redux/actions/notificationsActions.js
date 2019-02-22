import { getUnreadNotifications } from '../../api/notifications'

export const refreshNotifications = (uid, notifications) => {
    return dispatch => {
        getUnreadNotifications(uid).then(unread => {
            dispatch({
                type: 'REFRESH_NOTIFICATIONS',
                payload: {
                    alerts: notifications,
                    unread
                }
            })
        })
    }
}

export const resetNotificationsState = () => {
    return {
        type: 'RESET_NOTIFICATIONS_STATE'
    }
}
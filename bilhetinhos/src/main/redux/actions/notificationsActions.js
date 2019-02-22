export const refreshNotifications = notifications => {
    return {
        type: 'REFRESH_NOTIFICATIONS',
        payload: notifications
    }
}

export const resetNotificationsState = () => {
    return {
        type: 'RESET_NOTIFICATIONS_STATE'
    }
}
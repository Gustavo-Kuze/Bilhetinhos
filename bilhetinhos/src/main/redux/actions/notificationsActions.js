export const refreshNotifications = notifications => {
    return {
        type: 'REFRESH_NOTIFICATIONS',
        payload: notifications
    }
}
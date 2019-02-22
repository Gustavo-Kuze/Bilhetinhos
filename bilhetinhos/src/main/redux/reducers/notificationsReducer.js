// const newNotification = {
//     title: '',
//     receivedDate: '',
//     description: '',
//     sender: '',
//     read: true,
//     href: '/'
// }

const INITIAL_STATE = {
    alerts: [],
    unreadAlertsCount: '',
    anyUnreadAlerts: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REFRESH_NOTIFICATIONS':
            let { anyUnreadAlerts, unreadAlertsCount } = INITIAL_STATE
            if (action.payload) {
                if (action.payload.unread) {
                    anyUnreadAlerts = action.payload.unread.length > 0
                    unreadAlertsCount = action.payload.unread.length
                }
            }
            return {
                ...state,
                alerts: action.payload.alerts,
                anyUnreadAlerts,
                unreadAlertsCount
            }
        case 'RESET_NOTIFICATIONS_STATE':
            return INITIAL_STATE
        default:
            return state
    }
}
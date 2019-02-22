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
            let anyUnreadAlerts = action.payload.length > 0
            let unreadAlertsCount = action.payload.length
            return { ...state, alerts: action.payload, anyUnreadAlerts, unreadAlertsCount }
        case 'RESET_NOTIFICATIONS_STATE':
            return INITIAL_STATE
        default:
            return state
    }
}
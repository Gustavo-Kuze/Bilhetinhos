const newNotification = {
    title: '',
    receivedDate: '',
    description: '',
    sender: '',
    read: true,
    href: '/'
}

const INITIAL_STATE = {
    alerts: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REFRESH_NOTIFICATIONS':
            return {...state, alerts: action.payload} 
        case 'RESET_NOTIFICATIONS_STATE':
            return INITIAL_STATE
        default:
            return state
    }
}
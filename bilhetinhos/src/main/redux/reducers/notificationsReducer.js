const newNotification = {
    title: '',
    receivedDate: '',
    description: '',
    sender: '',
    read: true,
    href: '/'
}

const INITIAL_STATE = {
    notifications: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REFRESH_NOTIFICATIONS':
            return action.payload
        default:
            return state
    }
}
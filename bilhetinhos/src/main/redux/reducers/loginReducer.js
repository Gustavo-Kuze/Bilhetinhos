const INITIAL_STATE = {
    email: '',
    uid: '',
    accessToken: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            
            return {
                email: action.payload.email,
                uid: action.payload.uid,
                accessToken: action.payload.accessToken
            }
        default:
            return state
    }
}
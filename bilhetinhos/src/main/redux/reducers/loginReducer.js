const INITIAL_STATE = {
    displayName: '',
    email: '',
    uid: '',
    accessToken: '',
    providerData: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                displayName: action.payload.displayName,
                email: action.payload.email,
                uid: action.payload.uid,
                accessToken: action.payload.accessToken,
                providerData: action.payload.providerData
            }
        default:
            return state
    }
}
const INITIAL_STATE = {
    email: '',
    uid: '',
    accessToken: '',
    name: '',
    profilePic: '',
    bio: '',
    phone: '',
    mates: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOG_STATE_CHANGED':
            return {
                ...state,
                email: action.payload.email,
                uid: action.payload.uid,
                accessToken: action.payload.accessToken
            }
        case 'USER_PROFILE_UPDATED':
            return {
                ...state,
                name: action.payload.name,
                bio: action.payload.bio,
                phone: action.payload.phone
            }
        case 'USER_PICTURE_UPDATED':
            return {
                ...state,
                profilePic: action.payload
            }
        case 'MATE_ADDED':
            return {
                ...state,
                mates: state.mates.push(action.payload)
            }
        default:
            return state
    }
}
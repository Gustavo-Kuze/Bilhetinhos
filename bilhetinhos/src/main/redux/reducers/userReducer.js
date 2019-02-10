const INITIAL_STATE = {
    email: '',
    uid: '',
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
                email: action.payload.email || '',
                uid: action.payload.uid || '',
                name: action.payload.name || '',
                profilePic: action.payload.profilePic || '',
                bio: action.payload.bio || '',
                phone: action.payload.phone || '',
                mates: action.payload.mates || []
                // email: action.payload.email || state.email,
                // uid: action.payload.uid || state.uid,
                // name: action.payload.name || state.name,
                // profilePic: action.payload.profilePic || state.profilePic,
                // bio: action.payload.bio || state.bio,
                // phone: action.payload.phone || state.phone,
                // mates: action.payload.mates || state.mates
            }
        case 'RESET_USER_STATE':
            return {
                ...INITIAL_STATE
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
                mates: (state.mates) ? state.mates.concat(action.payload) : [action.payload]
            }
        default:
            return state
    }
}
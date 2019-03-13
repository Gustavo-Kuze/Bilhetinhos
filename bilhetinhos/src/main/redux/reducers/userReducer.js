const INITIAL_STATE = {
    email: '',
    uid: '',
    name: '',
    profilePic: '',
    bio: '',
    phone: '',
    matesUids: [],
    boardPrivacy: 'public'
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_USER_LOG_STATE':
            return {
                ...state,
                email: action.payload.email || '',
                uid: action.payload.uid || '',
                name: action.payload.name || '',
                profilePic: action.payload.profilePic || '',
                bio: action.payload.bio || '',
                phone: action.payload.phone || '',
                matesUids: action.payload.matesUids || [],
                boardPrivacy: action.payload.boardPrivacy || 'public'
            }
        case 'RESET_USER_STATE':
            return INITIAL_STATE
        case 'UPDATE_USER_PROFILE':
            return {
                ...state,
                name: action.payload.name,
                bio: action.payload.bio,
                phone: action.payload.phone
            }
        case 'UPDATE_USER_PICTURE':
            return {
                ...state,
                profilePic: action.payload
            }
        case 'ADD_MATE':
            return {
                ...state,
                matesUids: (state.mates) ? state.mates.concat(action.payload) : [action.payload]
            }
        case 'REFRESH_MATES_UIDS':
            return {
                ...state,
                matesUids: action.payload
            }
        case 'SET_BOARD_PRIVACY':
            return {
                ...state,
                boardPrivacy: action.payload
            }
        default:
            return state
    }
}
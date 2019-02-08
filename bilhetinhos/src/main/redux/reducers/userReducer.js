const INITIAL_STATE = {
    email: '',
    uid: '',
    accessToken: '',
    name: '',
    profilePic: '',
    bio: '',
    phone: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                email: action.payload.email,
                uid: action.payload.uid,
                accessToken: action.payload.accessToken
            }
        case 'USER_PROFILE_UPDATE':
            return {
                ...state,
                name: action.payload.name,
                bio: action.payload.bio,
                phone: action.payload.phone
            }
        case 'USER_PICTURE_UPDATE':
            return {
                ...state,
                profilePic: action.payload
            }
        default:
            return state
    }
}
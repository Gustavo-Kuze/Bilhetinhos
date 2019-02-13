const INITIAL_STATE = {
    profilePictureDownloadUrl: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_PROFILE_PICTURE_DOWNLOAD_URL':
            return {
                ...state,
                profilePictureDownloadUrl: action.payload
            }
        case 'RESET_CACHE_STATE':
            return INITIAL_STATE
        default:
            return state
    }
}
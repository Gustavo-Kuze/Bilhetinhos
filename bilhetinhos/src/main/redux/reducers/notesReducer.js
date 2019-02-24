const INITIAL_STATE = {
    userNotes: [],
    matesNotes: [],
    isLoadingUserNotes: false,
    isLoadingMatesNotes: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REFRESH_USER_NOTES":
            return { ...state, userNotes: action.payload, isLoadingUserNotes: false }
        case "REFRESH_NOTES":
            return { ...state, matesNotes: action.payload, isLoadingMatesNotes: false }
        case "LOADING_USER_NOTES":
            return { ...state, isLoadingUserNotes: true }
        case "LOADING_MATES_NOTES":
            return { ...state, isLoadingMatesNotes: true }
        case "REFRESH_MATES_NOTES":
            return action.payload
        case "RESET_NOTES":
            return INITIAL_STATE
        default:
            return state
    }
}
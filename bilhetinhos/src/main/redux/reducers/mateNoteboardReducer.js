const INITIAL_STATE = {
    user: {
        email: '',
        uid: '',
        name: '',
        profilePic: '',
        coverPic: '',
        bio: '',
        phone: '',
        matesUids: []
    },
    notes: [],
    isLoading: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REFRESH_USER":
            return { ...state, user: action.payload, isLoading: false }
        case "REFRESH_NOTES":
            return { ...state, notes: action.payload, isLoading: false }
        case "SET_USER":
            return { ...state, user: action.payload, isLoading: false }
        case "SET_NOTES":
            return { ...state, notes: action.payload, isLoading: false }
        case "IS_LOADING":
            return { ...state, isLoading: true }
        case "IS_LOADED":
            return { ...state, isLoading: false }
        default:
            return state
    }
}
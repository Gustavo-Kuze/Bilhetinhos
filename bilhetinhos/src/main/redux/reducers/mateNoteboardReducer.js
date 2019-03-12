const INITIAL_STATE = {
    user: {
        email: '',
        uid: '',
        name: '',
        profilePic: '',
        bio: '',
        phone: '',
        matesUids: []
    },
    notes: [],
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        case "SET_NOTES":
            return { ...state, notes: action.payload }
        case "IS_LOADING":
            return { ...state, isLoading: true }
        case "IS_LOADED":
            return { ...state, isLoading: false }
        default:
            return state
    }
}
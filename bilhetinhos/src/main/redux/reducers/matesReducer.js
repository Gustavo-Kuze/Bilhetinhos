const INITIAL_STATE = {
    mates: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REFRESH_MATES":
            return {
                ...state,
                mates: action.payload,
                loading: false
            }
        case "RESET_MATES":
            return INITIAL_STATE
        case "MATES_LOADING":
            return { ...state, loading: true }
        default:
            return state
    }
}
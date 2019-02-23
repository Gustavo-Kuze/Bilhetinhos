const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REFRESH_NOTES":
            return action.payload
        case "RESET_NOTES":
            return INITIAL_STATE
        default:
            return state
    }
}
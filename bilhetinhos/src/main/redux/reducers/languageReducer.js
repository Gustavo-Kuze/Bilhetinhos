const INITIAL_STATE = "pt"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return action.payload
        default:
            return state
    }
}
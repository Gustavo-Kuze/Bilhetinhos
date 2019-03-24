const INITIAL_STATE = {
    src: '',
    date: '',
    description: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ATTACHMENT_VIEW":
            return action.payload
        default:
            return state
    }
}
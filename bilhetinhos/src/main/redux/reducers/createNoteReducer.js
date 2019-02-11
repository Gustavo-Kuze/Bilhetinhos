const INITIAL_STATE = {
    noteColor: "#fff9c4",
    fontColor: "#424242",
    fontSize: 20,
    message: "",
    title: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHANGE_FONT_SIZE":
            return { ...state, fontSize: action.payload }
        case "CHANGE_MESSAGE":
            return { ...state, message: action.payload }
        case "CHANGE_TITLE":
            return { ...state, title: action.payload }
        case "CHANGE_NOTE_COLOR":
            return { ...state, noteColor: action.payload }
        case "CHANGE_FONT_COLOR":
            return { ...state, fontColor: action.payload }
        default:
            return state
    }
}
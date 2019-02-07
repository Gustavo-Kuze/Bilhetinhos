const INITIAL_STATE = {
    noteColor: "#fff9c4",
    fontColor: "#424242",
    fontSize: 20,
    message: "",
    title: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FONT_SIZE_CHANGED":
            return { ...state, fontSize: action.payload }
        case "MESSAGE_CHANGED":
            return { ...state, message: action.payload }
        case "TITLE_CHANGED":
            return { ...state, title: action.payload }
        case "NOTE_COLOR_CHANGED":
            return { ...state, noteColor: action.payload }
        case "FONT_COLOR_CHANGED":
            return { ...state, fontColor: action.payload }
        default:
            return state
    }
}
const INITIAL_STATE = {
    noteColor: "#fff9c4",
    fontColor: "#424242",
    fontSize: 20,
    message: "",
    title: '',
    noteMates: [],
    attachments: []
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
        case "REFRESH_NOTE_MATES":
            return { ...state, noteMates: action.payload }
        case "SET_ENTIRE_NOTE":
            return {
                ...state,
                noteColor: action.payload.noteColor,
                fontColor: action.payload.fontColor,
                fontSize: action.payload.fontSize,
                message: action.payload.message,
                title: action.payload.title,
                noteMates: action.payload.noteMates,
                attachments: action.payload.attachments
            }
        case "ADD_ATTACHMENTS":
            let attsAdd = []
            if (state.attachments) attsAdd = [...state.attachments]
            attsAdd = [...attsAdd, ...action.payload]
            return { ...state, attachments: attsAdd }
        case "REMOVE_ATTACHMENT":
            let attsRem = []
            if (state.attachments) attsRem = [...state.attachments]
            attsRem.splice(attsRem.indexOf(action.payload), 1)
            return { ...state, attachments: attsRem }
        default:
            return state
    }
}
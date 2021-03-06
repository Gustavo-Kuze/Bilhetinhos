export const handleFontSizeChanged = event => ({
    type: "CHANGE_FONT_SIZE",
    payload: parseInt(event.target.value)
})

export const handleMessageChanged = event => {
    return {
        type: "CHANGE_MESSAGE",
        payload: event.target.value
    }
}

export const handleTitleChanged = event => {
    return {
        type: "CHANGE_TITLE",
        payload: event.target.value
    }
}

export const handleNoteColorChanged = color => ({
    type: "CHANGE_NOTE_COLOR",
    payload: color
})

export const handleFontColorChanged = color => ({
    type: "CHANGE_FONT_COLOR",
    payload: color
})

export const refreshNoteMates = noteMates => ({
    type: "REFRESH_NOTE_MATES",
    payload: noteMates
})

export const setEntireNote = note => ({
    type: "SET_ENTIRE_NOTE",
    payload: note
})

export const addAttachments = attachments => ({
    type: "ADD_ATTACHMENTS",
    payload: attachments
})

export const removeAttachment = attachment => ({
    type: "REMOVE_ATTACHMENT",
    payload: attachment
})

export const createNote = () => {
    return {
        type: "CREATE_NOTE"
    }
}

export const deleteNote = () => {
    return {
        type: "DELETE_NOTE"
    }
}
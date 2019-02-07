export const handleFontSizeChanged = (event) => ({
    type: "FONT_SIZE_CHANGED",
    payload: parseInt(event.target.value)
})

export const handleMessageChanged = (event) => {
    return {
    type: "MESSAGE_CHANGED",
    payload: event.target.value
}}

export const handleNoteColorChanged = (event) => ({
    type: "NOTE_COLOR_CHANGED",
    payload: event.target.value
})

export const handleFontColorChanged = (event) => ({
    type: "FONT_COLOR_CHANGED",
    payload: event.target.value
})


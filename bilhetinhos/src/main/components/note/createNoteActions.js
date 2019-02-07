export const handleFontSizeChanged = (event) => ({
    type: "FONT_SIZE_CHANGED",
    payload: parseInt(event.target.value)
})

export const handleMessageChanged = (event) => {
    return {
    type: "MESSAGE_CHANGED",
    payload: event.target.value
}}

export const handleNoteColorChanged = (color) => ({
    type: "NOTE_COLOR_CHANGED",
    payload: color
})

export const handleFontColorChanged = (color) => ({
    type: "FONT_COLOR_CHANGED",
    payload: color
})


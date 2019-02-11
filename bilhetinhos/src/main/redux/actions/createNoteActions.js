import {setNote} from '../../api/notes'

export const handleFontSizeChanged = (event) => ({
    type: "CHANGE_FONT_SIZE",
    payload: parseInt(event.target.value)
})

export const handleMessageChanged = (event) => {
    return {
    type: "CHANGE_MESSAGE",
    payload: event.target.value
}}

export const handleTitleChanged = (event) => {
    return {
    type: "CHANGE_TITLE",
    payload: event.target.value
}}

export const handleNoteColorChanged = (color) => ({
    type: "CHANGE_NOTE_COLOR",
    payload: color
})

export const handleFontColorChanged = (color) => ({
    type: "CHANGE_FONT_COLOR",
    payload: color
})

export const create = (uid, note) => {
    setNote(uid, note)
    return {
    type: "CREATE_NOTE"
}}




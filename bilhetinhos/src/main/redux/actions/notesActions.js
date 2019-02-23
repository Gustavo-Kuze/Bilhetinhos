export const refreshNotes = notes => {
    return {
        type: "REFRESH_NOTES",
        payload: notes
    }
}

export const resetNotes = () => {
    return {
        type: "RESET_NOTES"
    }
}
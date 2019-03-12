export const setMateNoteboardUser = user => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const setMateNoteboardNotes = notes => {
    return {
        type: "SET_NOTES",
        payload: notes
    }
}

export const setIsLoading = () => {
    return {
        type: "IS_LOADING"
    }
}

export const setIsLoaded = () => {
    return {
        type: "IS_LOADED"
    }
}
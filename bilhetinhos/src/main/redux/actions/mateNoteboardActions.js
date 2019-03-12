import { getUserNotes } from '../../api/notes'

export const setMateNoteboardUser = user => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const refreshMateNoteboardNotes = uid => {
    return dispatch => {
        getUserNotes(uid).then(notes => {
            dispatch({
                type: "REFRESH_NOTES",
                payload: notes
            })
        })
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
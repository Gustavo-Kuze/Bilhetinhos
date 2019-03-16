import { getUserNotes } from '../../api/notes'
import { getUserByUid } from '../../api/users'

export const refreshMateNoteboardUser = uid => {
    return dispatch => {
        getUserByUid(uid).then(user => {
            dispatch({
                type: "REFRESH_USER",
                payload: user
            })
        })
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
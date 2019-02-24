import { getUserNotes } from '../../api/notes'

export const refreshUserNotes = uid => {
    return dispatch => {
        getUserNotes(uid).then(notes => {
            dispatch({
                type: "REFRESH_USER_NOTES",
                payload: notes
            })
        })
    }
}

export const refreshMatesNotes = notes => {
    return {
        type: "REFRESH_MATES_NOTES",
        payload: notes
    }
}

export const loadingUserNotes = () => {
    return {
        type: "LOADING_USER_NOTES"
    }
}

export const loadingMatesNotes = () => {
    return {
        type: "LOADING_MATES_NOTES"
    }
}

export const resetNotes = () => {
    return {
        type: "RESET_NOTES"
    }
}
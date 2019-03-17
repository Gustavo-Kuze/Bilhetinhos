import { getUserNotes, getAllMatesNotes } from '../../api/notes'
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

export const refreshMateNoteboardNotes = (uid, matesUids) => {
    return async dispatch => {
        let allMatesNotes = []
        if (matesUids) {
            allMatesNotes = await getAllMatesNotes(uid, matesUids)
        }

        let notes = await getUserNotes(uid)

        if (allMatesNotes) {
            allMatesNotes = allMatesNotes.length > 0 ? allMatesNotes.reduce((prev, cur) => prev.concat(cur)) : []
            notes = notes.concat(notes, allMatesNotes)
        }
        
        dispatch({
            type: "REFRESH_NOTES",
            payload: notes
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
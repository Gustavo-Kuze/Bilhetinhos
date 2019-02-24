import { getUserNotes, getAllMatesNotes } from '../../api/notes'

export const refreshUserNotes = uid => {
    return dispatch => {
        getUserNotes(uid).then(notes => {
            dispatch({
                type: "REFRESH_USER_NOTES",
                payload: notes
            })
        }).catch(err => {
            dispatch({
                type: "USER_NOTES_LOADED"
            })
        })
    }
}

export const refreshMatesNotes = (uid, matesUids) => {
    return dispatch => {
        getAllMatesNotes(uid, matesUids).then(allMatesNotes => {
            if (allMatesNotes.length > 0) {
                allMatesNotes = allMatesNotes.reduce((prev, cur) => prev.concat(cur))
                dispatch({
                    type: "REFRESH_MATES_NOTES",
                    payload: allMatesNotes
                })
            }else{
                console.log('allMatesNotes was an empty array')
                dispatch({
                    type: "MATES_NOTES_LOADED"
                })
            }
        })
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
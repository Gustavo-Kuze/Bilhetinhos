import { getUserNotes } from '../../api/notes'
import { getUserByUid } from '../../api/users'
import firebase from '../../api/firebase'

export const refreshMateNoteboardUser = uid => {
    return dispatch => {
        getUserByUid(uid).then(user => {
            if(user.profilePic){
                firebase.storage().ref(user.profilePic).getDownloadURL().then(url => {
                    dispatch({
                        type: "SET_USER",
                        payload: {...user, profilePic: url}
                    })
                })
            }else{
                dispatch({
                    type: "SET_USER",
                    payload: user
                })
            }
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
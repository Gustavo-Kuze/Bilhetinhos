import { getMatesUidsAndReference } from '../../api/mates'

export const changeUserLogState = userCredentials => {
    return {
        type: "CHANGE_USER_LOG_STATE",
        payload: userCredentials
    }
}

export const resetUserState = () => {
    return {
        type: "RESET_USER_STATE"
    }
}

export const updateUserProfile = profileCredentials => {
    return {
        type: "UPDATE_USER_PROFILE",
        payload: profileCredentials
    }
}

export const updateUserPicture = profilePic => {
    return {
        type: "UPDATE_USER_PICTURE",
        payload: profilePic
    }
}

export const refreshMatesUids = uid => {
    return dispatch => {
        getMatesUidsAndReference(uid).then(uidsAndRef => {
            dispatch({
                type: "REFRESH_MATES_UIDS",
                payload: uidsAndRef.mates
            })
        })
    }
}
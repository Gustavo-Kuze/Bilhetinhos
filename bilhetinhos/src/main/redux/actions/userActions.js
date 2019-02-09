export const changeUserLogState = userCredentials => {
    return {
        type: "USER_LOG_STATE_CHANGED",
        payload: userCredentials
    }
}

export const updateUserProfile = profileCredentials => {
    return {
        type: "USER_PROFILE_UPDATED",
        payload: profileCredentials
    }
}

export const updateUserPicture = profilePic => {
    return {
        type: "USER_PROFILE_UPDATED",
        payload: profilePic
    }
}

export const addMate = mate => {
    return {
        type: "MATE_ADDED",
        payload: mate
    }
}
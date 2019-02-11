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

// talvez fique obsoleta logo
export const addMate = mate => {
    return {
        type: "ADD_MATE",
        payload: mate
    }
}

export const refreshMates = mates => {
    return {
        type: "REFRESH_MATES",
        payload: mates
    }
}
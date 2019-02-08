export const login = userCredentials => {
    return {
        type: "USER_LOGIN",
        payload: userCredentials
    }
}

export const updateUserProfile = profileCredentials => {
    return {
        type: "USER_PROFILE_UPDATE",
        payload: profileCredentials
    }
}

export const updateUserPicture = profilePic => {
    return {
        type: "USER_PROFILE_UPDATE",
        payload: profilePic
    }
}
export const login = userCredentials => {
    return {
        type: "USER_LOGIN",
        payload: userCredentials
    }
}
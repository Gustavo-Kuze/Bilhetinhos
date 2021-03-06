import { getMates } from '../../api/mates'

export const refreshMates = (uid, callback = null) => {
    return dispatch => {
        getMates(uid).then(mates => {
            dispatch({
                type: "REFRESH_MATES",
                payload: mates
            })
            if (callback) callback()
        })
    }
}

export const matesLoading = () => {
    return {
        type: "MATES_LOADING"
    }
}

export const resetMates = () => {
    return {
        type: "RESET_MATES"
    }
}
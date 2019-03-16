export const changeProfilePictureDownloadUrl = downloadUrl => {
    return {
        type: "CHANGE_PROFILE_PICTURE_DOWNLOAD_URL",
        payload: downloadUrl
    }
}

export const changeCoverPictureDownloadUrl = downloadUrl => {
    return {
        type: "CHANGE_COVER_PICTURE_DOWNLOAD_URL",
        payload: downloadUrl
    }
}

export const resetCacheState = () => {
    return {
        type: "RESET_CACHE_STATE"
    }
}
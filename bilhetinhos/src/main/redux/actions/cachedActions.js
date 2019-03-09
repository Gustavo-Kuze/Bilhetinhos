export const changePictureDownloadUrl = downloadUrl => {
    return {
        type: "CHANGE_PROFILE_PICTURE_DOWNLOAD_URL",
        payload: downloadUrl
    }
}

export const resetCacheState = () => {
    return {
        type: "RESET_CACHE_STATE"
    }
}
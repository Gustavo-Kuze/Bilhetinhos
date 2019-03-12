export const markNoteIfQuery = (title) => {
    let markedNoteId = ''
    let params = new URLSearchParams(window.location.search)
    let isEqual = false
    if (params.has('note')) {
        let note = params.get('note')
        isEqual = title === note
        if (isEqual) {
            markedNoteId = `note-${params.get('note').replace(/ /g, '')}`
        }
    }
    return {
        id: markedNoteId,
        mark: isEqual
    }
}
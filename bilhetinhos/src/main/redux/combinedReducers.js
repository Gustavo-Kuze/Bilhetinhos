import { combineReducers } from 'redux'
import editNoteReducer from './reducers/editNoteReducer'
import userReducer from './reducers/userReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import cachedReducer from './reducers/cachedReducer'
import notificationsReducer from './reducers/notificationsReducer'
import matesReducer from './reducers/matesReducer'
import notesReducer from './reducers/notesReducer'
import languageReducer from './reducers/languageReducer'
import mateNoteboardReducer from './reducers/mateNoteboardReducer'
import attachmentViewReducer from './reducers/attachmentViewReducer'

const combinedReducers = combineReducers({
    editNote: editNoteReducer,
    user: userReducer,
    toastr: toastrReducer,
    cached: cachedReducer,
    notifications: notificationsReducer,
    mates: matesReducer,
    notes: notesReducer,
    language: languageReducer,
    mateNoteboard: mateNoteboardReducer,
    attachmentView: attachmentViewReducer
})

export default combinedReducers
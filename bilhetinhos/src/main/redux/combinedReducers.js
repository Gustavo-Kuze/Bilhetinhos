import { combineReducers } from 'redux'
import createNoteReducer from './reducers/createNoteReducer'
import userReducer from './reducers/userReducer'
import {reducer as torstrReducer} from 'react-redux-toastr'
import cachedReducer from './reducers/cachedReducer'

const combinedReducers = combineReducers({
    createNote: createNoteReducer,
    user: userReducer,
    toastr: torstrReducer,
    cached: cachedReducer
})

export default combinedReducers
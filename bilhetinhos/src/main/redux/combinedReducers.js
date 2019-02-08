import { combineReducers } from 'redux'
import createNoteReducer from './reducers/createNoteReducer'
import userReducer from './reducers/userReducer'

const combinedReducers = combineReducers({
    createNote: createNoteReducer,
    user: userReducer
})

export default combinedReducers
import { combineReducers } from 'redux'
import createNoteReducer from './reducers/createNoteReducer'

const combinedReducers = combineReducers({
    createNote: createNoteReducer
})

export default combinedReducers
import { combineReducers } from 'redux'
import createNoteReducer from '../components/note/createNoteReducer'

const reducers = combineReducers({
    createNote: createNoteReducer
})

export default reducers
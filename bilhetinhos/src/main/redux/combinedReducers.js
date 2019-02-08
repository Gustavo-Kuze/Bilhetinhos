import { combineReducers } from 'redux'
import createNoteReducer from './reducers/createNoteReducer'
import loginReducer from './reducers/loginReducer'

const combinedReducers = combineReducers({
    createNote: createNoteReducer,
    login: loginReducer
})

export default combinedReducers
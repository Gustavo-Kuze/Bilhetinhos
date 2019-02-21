import { combineReducers } from 'redux'
import noteReducer from './reducers/noteReducer'
import userReducer from './reducers/userReducer'
import {reducer as torstrReducer} from 'react-redux-toastr'
import cachedReducer from './reducers/cachedReducer'
import notificationsReducer from './reducers/notificationsReducer'

const combinedReducers = combineReducers({
    note: noteReducer,
    user: userReducer,
    toastr: torstrReducer,
    cached: cachedReducer,
    notifications: notificationsReducer
})

export default combinedReducers
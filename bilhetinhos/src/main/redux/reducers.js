import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    test: () => {return {payload: 'asasd'}}
})


export default rootReducer
import { createStore } from 'redux'
import combinedReducers from './combinedReducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(combinedReducers, devTools)
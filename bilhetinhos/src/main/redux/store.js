import { createStore } from 'redux'
import combinedReducers from './combinedReducers'
import {loadState} from './localStorage/'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(combinedReducers, loadState(), devTools)
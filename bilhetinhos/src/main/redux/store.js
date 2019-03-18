import { createStore, applyMiddleware } from 'redux'
import combinedReducers from './combinedReducers'
import { loadState } from './localStorage/'
import thunk from 'redux-thunk'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

export default applyMiddleware(thunk)(createStore)(combinedReducers, loadState(), devTools)
import { createStore } from 'redux'
import combinedReducers from './combinedReducers'

export default createStore(combinedReducers)
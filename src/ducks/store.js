import { createStore, applyMiddleware } from 'redux'
import promiseMiddleWare from 'redux-promise-middleware'
import reducer from './reducer'

export default createStore(reducer, applyMiddleware(promiseMiddleWare))
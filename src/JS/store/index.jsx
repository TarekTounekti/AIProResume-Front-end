import { createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import combineReducers from '../reducers/index'

const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

const Store = createStore(
    combineReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))

)

export default Store;
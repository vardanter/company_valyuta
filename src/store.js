import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { reducers } from './reducers';

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    thunkMiddleware
];

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
);

window.store = store;

export default store;
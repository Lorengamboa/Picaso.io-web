'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { logger } from '../middlewares/logger';
import SocketMiddleware from '../middlewares/socket';

//
const host = window.location.protocol + "//" + window.location.host;
const socketMiddleware = SocketMiddleware(host);

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, socketMiddleware)
);
export default store;
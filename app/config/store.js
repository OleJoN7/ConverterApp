import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';

import reducers from '../reducers';
import rootSage from './sagas';

const sagaMiddleware = createSagaMiddleWare();
const middleWare = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleWare.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleWare));

sagaMiddleware.run(rootSage);

export default store;

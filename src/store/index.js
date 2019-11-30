import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const middleWares = [];

if (process.env.NODE_ENV !== "production") {
  middleWares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
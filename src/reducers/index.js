
import { combineReducers } from 'redux';
import attackDataReducer from './attackData';

const rootReducer = combineReducers({
  attackDataState: attackDataReducer,
});

export default rootReducer;
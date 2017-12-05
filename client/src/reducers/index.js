import { combineReducers } from 'redux';
import stats from './statsReducer';

const rootReducer = combineReducers({
  stats
});

export default rootReducer;

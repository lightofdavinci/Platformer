import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import StatsReducer from './stats';
import TimeReducer from './time';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  stats: StatsReducer,
  time: TimeReducer
});

export default rootReducer;

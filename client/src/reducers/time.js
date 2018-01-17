import { UPDATE_UNIX_TIME } from '../actions';

export default (time = null, action) => {
  switch (action.type) {
    case UPDATE_UNIX_TIME:
      return action.payload;
    default:
      return time;
  }
};

import { GET_STATS } from '../actions';

export default (stats = [], action) => {
  switch (action.type) {
    case GET_STATS:
      return action.payload.data;
    default:
      return stats;
  }
};

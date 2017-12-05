import axios from 'axios';

export const GET_STATS = 'GET_STATS';

export const getStats = () => {
  const statsEndpoint = 'http://localhost:3333/stats';
  const stats = axios.get(statsEndpoint);
  return {
    type: GET_STATS,
    payload: stats
  };
};

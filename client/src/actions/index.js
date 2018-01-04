import axios from 'axios';

// Fixes an issue with axios and express-session where sessions
// would not persist between routes
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const GET_STATS = 'GET_STATS';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/new-user`, { username, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/help');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then(() => {
        dispatch({
          type: USER_AUTHENTICATED
        });
        history.push('/help');
      })
      .catch(() => {
        dispatch(authError('Incorrect name/password combo'));
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/logout`)
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED
        });
      })
      .catch(() => {
        dispatch(authError('Failed to log you out'));
      });
  };
};

export const getStats = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/stats`)
      .then(response => {
        dispatch({
          type: GET_STATS,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch stats'));
      });
  };
};

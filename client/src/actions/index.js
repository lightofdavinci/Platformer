import axios from 'axios';

const ROOT_URL = 'https://sphere-game.herokuapp.com';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const GET_STATS = 'GET_STATS';
export const UPDATE_STATS = 'UPDATE_STATS';
export const UPDATE_UNIX_TIME = 'UPDATE_UNIX_TIME';

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
        history.push('/login');
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
      .then(res => {
        localStorage.setItem('tkn', res.data.token);
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

export const checkIfAuthenticated = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/jwt`, {
        headers: {
          Authorization: localStorage.getItem('tkn')
        }
      })
      .then(res => {
        dispatch({
          type: USER_AUTHENTICATED
        });
      })
      .catch(() => {
        dispatch({
          type: USER_UNAUTHENTICATED
        });
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

export const updateStats = (time, history) => {
  const unixTimeStamp = time[1] - time[0];
  const seconds = Math.floor((unixTimeStamp / 1000) % 60);
  const minutes = Math.floor((unixTimeStamp / 1000 / 60) % 60);
  const statsTime =
    ('0' + minutes).slice(-2) + ' : ' + ('0' + seconds).slice(-2);
  const statsObj = {
    unixTimeStamp,
    time: statsTime,
    tkn: localStorage.getItem('tkn')
  };
  return dispatch => {
    axios
      .put(`${ROOT_URL}/stats`, statsObj)
      .then(response => {
        dispatch({
          type: UPDATE_STATS
        });
        history.push('/leaderboard');
      })
      .catch(err => {
        console.log('Failed to update stats ', err);
      });
  };
};

export const updateUnixTime = time => {
  return dispatch => {
    dispatch({
      type: UPDATE_UNIX_TIME,
      payload: time
    });
  };
};

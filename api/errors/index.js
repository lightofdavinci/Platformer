const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const responseFunc = (err, res) => {
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
}

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  responseFunc(err, res);
};

const sendServerError = (err, res) => {
  res.status(STATUS_SERVER_ERROR);
  responseFunc(err, res);
};

module.exports = {
  sendUserError,
  sendServerError
};
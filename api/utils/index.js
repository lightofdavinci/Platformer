const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const { sendUserError } = require('../errors');

const BCRYPT_COST = 11;

const hashedPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return sendUserError('Password can\'t be blank', res);
  }
  bcrypt
    .hash(password, BCRYPT_COST)
    .then((pw) => {
      req.password = pw;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const loggedIn = (req, res, next) => {
  const { username } = req.session;
  if (!username) {
    return sendUserError('User is not logged in', res);
  }
  User.findOne({ username }, (err, user) => {
    if (err) {
      sendUserError(err, res);
    } else if (!user) {
      sendUserError('User does exist', res);
    } else {
      req.user = user;
      next();
    }
  });
};

// const restrictedPermissions = (req, res, next) => {
//   const path = req.path;
//   if (/restricted/.test(path)) {
//     if (!req.session.username) {
//       sendUserError('user not autorized', res);
//       return;
//     }
//   }
//   next();
// };

module.exports = {
  sendUserError,
  hashedPassword,
  loggedIn,
  // restrictedPermissions,
};
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');

const { sendUserError } = require('../errors');

const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return sendUserError('username undefined', res);
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      return sendUserError('No user found at that id', res);
    }
    const hashedPw = user.passwordHash;
    bcrypt
      .compare(password, hashedPw)
      .then((response) => {
        if (!response) throw new Error();
        req.session.username = username;
        req.user = user;
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        return sendUserError(error, res);
      });
  });
};

const createUser = (req, res) => {
  const { username } = req.body;
  if (!username) {
    return sendUserError('Username is required', res);
  }
  const passwordHash = req.password;
  const newUser = new User({ username, passwordHash });
  newUser.save((err, savedUser) => {
    if (err) {
      if (err.code === 11000) {
        return sendUserError('This username is already taken', res);
      }
      return sendUserError('Need both username/PW fields', res);
    }
    res.json(savedUser);
  });
};

const logout = (req, res) => {
  if (!req.session.username) {
    return sendUserError('User is not logged in', res);
  }
  req.session.username = null;
  res.json({ success: true });
};

// server.get('/restricted/users', (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       middleWare.sendUserError('500', res);
//       return;
//     }
//     res.json(users);
//   });
// });

module.exports = {
  createUser,
  loginUser,
  logout
};
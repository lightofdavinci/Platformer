const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModels');

const { sendUserError, sendServerError } = require('../errors');

const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return sendUserError('username undefined', res);
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      return sendServerError('No user found at that id', res);
    }
    const hashedPw = user.passwordHash;
    bcrypt
      .compare(password, hashedPw)
      .then(response => {
        if (!response) throw new Error();
      })
      .then(() => {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ token });
      })
      .catch(error => sendServerError(error, res));
  });
};

const createUser = (req, res) => {
  const { username } = req.body;
  if (!username) return sendUserError('Username is required', res);
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

const getAllStats = (req, res) => {
  User.find({})
    .sort('stats.unixTimeStamp')
    .select("username stats")
    .exec()
    .then(stats => res.json(stats))
    .catch(err => sendServerError(err, res));
};

const updateUserStats = (req, res) => {
  const { unixTimeStamp, time } = req.body;
  User.findById(req.userId, (err, user) => {
    if (err) { return sendServerError('Couldn\'t find user', res); }
    if (user.stats.unixTimeStamp <= unixTimeStamp && user.stats.unixTimeStamp !== null) {
      return res.send(user.stats);
    }
    user.stats = { unixTimeStamp, time };
    user.save((err, updatedUser) => {
      if (err) return sendServerError('Couldn\'t save changes', res);
      res.send(updatedUser.stats);
    });
  });
};

module.exports = {
  createUser,
  loginUser,
  getAllStats,
  updateUserStats
};
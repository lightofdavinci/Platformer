const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendUserError, sendServerError } = require('../errors');

const BCRYPT_COST = 11;

const hashedPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return sendUserError('Password can\'t be blank', res);
  }
  bcrypt
    .hash(password, BCRYPT_COST)
    .then(pw => {
      req.password = pw;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
};

const verifyToken = (req, res, next) => {
  const tkn = req.body.tkn;
  if (!tkn) return res.status(401).send({ err: 'No token provided.' });
  jwt.verify(tkn, process.env.SECRET, (err, decoded) => {
    if (err) return sendServerError('Failed to authenticate token.', res);
    req.userId = decoded.id;
    next();
  });
}

const checkIfAuthenticated = (req, res) => {
  const tkn = req.get('Authorization');
  if (!tkn) return res.status(401).send({ authenticated: false });
  jwt.verify(tkn, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ authenticated: false });
    res.status(200).send({ authenticated: true });
  });
}

module.exports = {
  hashedPassword,
  verifyToken,
  checkIfAuthenticated
};
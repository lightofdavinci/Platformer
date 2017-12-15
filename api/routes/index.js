const userControllers = require('../controllers/userControllers');
const { hashedPassword } = require('../utils');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(hashedPassword, userControllers.createUser);
  app
    .route('/login')
    .post(userControllers.loginUser);
  app
    .route('/logout')
    .post(userControllers.logout);
};
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
  app
    .route('/users')
    .get(userControllers.getAllUsers);
  app
    .route('/users')
    .delete(userControllers.removeAllUsers);
  app
    .route('/stats')
    .get(userControllers.getAllStats);
  app
    .route('/stats')
    .put(userControllers.updateUserStats);
};
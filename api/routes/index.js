const userControllers = require('../controllers/userControllers');
const { hashedPassword, verifyToken, checkIfAuthenticated } = require('../utils');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(hashedPassword, userControllers.createUser);
  app
    .route('/login')
    .post(userControllers.loginUser);
  app
    .route('/jwt')
    .get(checkIfAuthenticated);
  app
    .route('/stats')
    .get(userControllers.getAllStats);
  app
    .route('/stats')
    .put(verifyToken, userControllers.updateUserStats);
};
const userControllers = require('../controllers/userControllers');
const { hashedPassword, verifyToken } = require('../utils');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(hashedPassword, userControllers.createUser);
  app
    .route('/login')
    .post(userControllers.loginUser);
  app
    .route('/stats')
    .get(verifyToken, userControllers.getAllStats);
  app
    .route('/stats')
    .put(verifyToken, userControllers.updateUserStats);
};
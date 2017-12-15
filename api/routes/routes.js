const userControllers = require('../controllers/userControllers');
const middleWare = require('../middlewares/index.js');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(middleWare.hashedPassword, userControllers.createUser);
  app
    .route('/login')
    .post(userControllers.loginUser);
  app
    .route('/logout')
    .post(userControllers.logout);
};
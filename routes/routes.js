const TestController = require('../controllers/test_controller');

module.exports = (app) => {
  //app.get('path', controller.something);

  // If GET applied to this api route, return the test() function of TestController
  app.get('/api/test/', TestController.test);
}

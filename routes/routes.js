const TestController = require('../controllers/test_controller');

module.exports = (app) => {
  //app.get('path', controller.something);

  // If GET applied to this api route, return the test() function of TestController

  // ##########################################################################
  //Test functions
  // ##########################################################################

  app.get('/api/test/', TestController.test);
  app.post('/api/test/', TestController.reflect);

  // users
  app.post('/api/test/users/', TestController.createUser);
  app.get('/api/test/users/', TestController.getAllUsers);
  app.post('/api/test/users/contracts/', TestController.getUserContracts);

  // contracts
  app.post('/api/test/contracts/', TestController.createContract);

}

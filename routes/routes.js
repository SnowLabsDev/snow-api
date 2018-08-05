const TestController = require('../controllers/test_controller');
const UserController = require('../controllers/user_controller');
const ContractController = require('../controllers/contract_controller');

module.exports = (app) => {

  // ##########################################################################
  //Test functions
  // ##########################################################################

  app.get('/api/test/', TestController.test);
  app.post('/api/test/', TestController.reflect);


  // ##########################################################################
  // User functions
  // ##########################################################################

  // *****
  // Create
  // *****

  // done
  // create a single user
  app.post('/api/users/create/', UserController.createUser);

  // create single headless user
  app.post('/api/users/create/headless-single/', UserController.createSingleHeadless);

  // create multi headless users from array
  app.post('/api/users/create/headless-multiple/', UserController.createMultiHeadless);

  // *****
  // Read
  // *****

  // done
  // get a single user by Id
  app.get('/api/users/id/:userId', UserController.getUserById);

  // done
  // get a single user by phone
  app.get('/api/users/p/:userPhone', UserController.getUserByPhone);

  // done
  // get all users
  app.get('/api/users/', UserController.getUsers);

  // get a user if authenticated
  app.get('/api/users/auth/:userPhone/:userPin', UserController.authUser);

  // get a user's ethAddress
  app.get('/api/users/:userPhone/ethAddress', UserController.getEthAddress);
  // *****
  // Update
  // *****

  // done
  // updates a user found by specific Id
  app.put('/api/users/id/:userId', UserController.updateUserById);

  // done
  // updates a user found by phone
  app.put('/api/users/p/:userPhone', UserController.updateUserByPhone);

  // *****
  // Delete
  // *****

  // done
  // find and delete a user with a specific Id and return the object
  app.delete('/api/users/id/:userId', UserController.deleteUserById);

  // done
  // find and delete user with a specific phone number and return the object
  app.delete('/api/users/p/:userPhone', UserController.deleteUserByPhone);

  // ##########################################################################
  // Contract functions
  // ##########################################################################

  // *****
  // Create
  // *****

  // done
  // create a single contract
  app.post('/api/contracts/', ContractController.createContract)

  // *****
  // Read
  // *****

  // done
  // read full contract info
  app.get('/api/contracts/id/:contractId', ContractController.getContractById)

  // done
  // get ALL contracts... for everyone!
  app.get('/api/contracts/', ContractController.getContracts);

  // *****
  // Update
  // *****

  // done
  // update a contract found by a specific Id
  app.put('/api/contracts/id/:contractId', ContractController.updateContractById);

  // *****
  // Delete
  // *****

  // done
  // delete a contract found by a specific Id and return the object
  app.delete('/api/contracts/id/:contractId', ContractController.deleteContractById);

  // ##########################################################################
  // Blockchain Deploy functions (done through /api/contracts/)
  // ##########################################################################

  // !!!!!
  // We might be able to just do this through the normal contract edit
  // ^^^^ implemented this in code but haven't test
  // !!!!!

  // compile contract by Id
  app.get('/api/contracts/id/:contractId/compile/', ContractController.compileContractById);

  // deploy contract by Id
  app.get('/api/contracts/id/:contractId/deploy/', ContractController.deployContractById);


};

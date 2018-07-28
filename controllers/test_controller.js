const User = require('../models/UserModel');
const Contract = require('../models/ContractModel');
const abiTypes = require('./abi_details');

module.exports = {

  // export the responses that we have at each of these locations
  test(req, res, next) {
    res.send({ test: 'plz work' });
  },

  reflect(req, res, next) {
    props = req.body;
    console.log(req);
    res.send(props)
    .catch(next);
  },

  createUser(req, res, next) {
    const userProps = req.body;
    const user = new User(userProps);
    //console.log(user);
    user.save()
      .then(() => {
        res.send(user);
      })
      .catch(next);
  },

  getAllUsers(req, res, next) {
    User.find({}, (err, users) => {
      let userMap = {};

      users.forEach((user) => {
        userMap[user._id] = user;
      });
      res.send(userMap);
    });
  },

  async createContract(req, res, next) {
    const contractProps = req.body;
    const {
      owner,
      participants,
      contractType,
    } = contractProps;

    // grab the abi for this contract type - same for all of a type
    const contractABI = abiTypes[contractType];

    // init the contract with current known info
    const contract = new Contract({ ethABI: contractABI, contractType });

    // grab the owner's ID from Mongo
    const userOwner = await User.findOne({ phone: owner });

    // push the details onto owner and the contract
    contract.owner = userOwner._id;
    userOwner.ownContracts.push(contract._id);
    await userOwner.save();
    // do the same for the users participating in the contract
    for (let i=0; i < participants.length; i++) {
      const userIn = await User.findOne({ "phone": participants[i] });

      contract.participants.push(userIn._id);
      userIn.inContracts.push(contract._id);
      await userIn.save();
      //console.log(userIn);
    }

    // save to Mongo
    await contract.save();

    // respond to the app with the full contract (minus the ethAddress)
    res.send(contract);
  },

  async getUserContracts(req, res, next) {
    userProps = req.body;

    const contracts = {};

    if(userProps.id) {
      const user = await User.findById(userProps.id);
      console.log(user);
      contracts.ownContracts = user.ownContracts;
      contracts.inContracts = user.inContracts;
    }

    if(userProps.phone) {
      const user = await User.findOne({ "phone": userProps.phone });
      console.log(user);
      contracts.ownContracts = user.ownContracts;
      contracts.inContracts = user.inContracts;
    }

    res.send(contracts);
  },
};

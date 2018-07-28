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

    const contractABI = abiTypes[contractType];

    const contract = new Contract({ ethABI: contractABI, contractType });

    const userOwner = await User.findOne({ phone: owner });

    contract.owner = userOwner._id;
    userOwner.ownContracts.push(contract._id);

    for (let i=0; i < participants.length; i++) {
      const userIn = await User.findOne({ "phone": participants[i] });

      contract.participants.push(userIn._id);
      userIn.inContracts.push(contract._id);
      //console.log(userIn);
    }

    contract.save();

    res.send(contract);
  },
};

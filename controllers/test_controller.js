const axios = require('axios');

// Models
const User = require('../models/UserModel');
const Contract = require('../models/ContractModel');
const Solidity = require('../models/SolidityModel');
const Func = require('../models/FuncModel');
const Parameter = require('../models/ParameterModel');

// Creators
const SingleIssueBallotCreator = require('../creators/SingleIssueBallotCreator');

module.exports = {
  test(req, res, next) {
    res.send({ test: 'plz work' });
  },

  reflect(req, res, next) {
    props = req.body;
    console.log(req);
    res.send(props)
    .catch(next);
  },

  async SolidityTest(req, res, next) {
    const contractProps = req.body;

    const {
      owner, // phone number
      participants, // phone number
      contractType, // string, "SingleIssueBallot"
      arguments // an array. Assuming now that we just have the proposalName
    } = contractProps;

    // hunt down the overall model we have for this contact, we'll have one per version
    const solidityContract = await Solidity.findOne({type: contractType});

    // create a new contract with info we have so far
    const contract = new Contract({
      contractType,
      arguments, // better way of handling attempted below, non permanent answer to this problem
      solidityContract: solidityContract._id,
    });

    // pull owner, add to contract
    const userOwner = await User.findOne({ phone: owner });
    contract.owner = userOwner._id;
    userOwner.ownContracts.push(contract._id);

    // pull participants, add to contract
    for (let i=0; i < participants.length; i++) {
      const userIn = await User.findOne({ "phone": participants[i] });
      contract.participants.push(userIn._id);
      contract.arguments[1].push(userIn.ethAddress);
      userIn.inContracts.push(contract._id);
      await userIn.save();
    }

    // push contract to Mongo
    await contract.save();

    // send back
    res.send(contract);
  },

  async getPopulatedContract(req, res, next) {
    const contractProps = req.body;
    const { cID } = contractProps;

    await Contract.findById(cID)
      .populate('owner')
      .populate('participants')
      .exec(function (err, contract) {
        res.send(contract);
      });
  }
};

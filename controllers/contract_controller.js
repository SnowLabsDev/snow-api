const User = require('../models/UserModel');
const Contract = require('../models/ContractModel');
const axios = require('axios');

module.exports = (app) = {

  // **************************************************************************
  // Create
  // **************************************************************************

  // done
  // create a contract for SingleIssueBallot
  async createContract(req, res, next) {
    const contractProps = req.body;

    const {
      owner, // phone number
      participants, // phone number
      contractType, // string, "SingleIssueBallot"
      arguments // an array. Assuming now that we just have the proposalName
    } = contractProps;

    // need to find a way to sort arguments by type
    // right now I'm going to assume we're just building for SingleIssueBallot
    const contract = new Contract({ contractType, arguments });

    // grab the owner's ID from Mongo
    const userOwner = await User.findOne({ phone: owner });

    // push the details onto owner and the contract
    contract.owner = userOwner._id;
    userOwner.ownContracts.push(contract._id);

    await userOwner.save();

    // do the same for the users participating in the contract

    // !!!!!
    // We'll want to add headlessness support soone
    // !!!!!
    for (let i=0; i < participants.length; i++) {
      const userIn = await User.findOne({ "phone": participants[i] });

      contract.participants.push(userIn._id);
      userIn.inContracts.push(contract._id);
      await userIn.save();
    }

    // save to Mongo
    await contract.save();

    // send back contract -- all deployment and compilation functions will
    // only be executed on command
    res.send(contract);

  },

  // **************************************************************************
  // Read
  // **************************************************************************

  // done
  // get a single contract via it's Id
  async getContractById(req, res, next) {
    const contract = await Contract.findById(req.params.contractId);

    res.send(contract);
  },

  // done
  // get all contracts in MongoDB
  async getContracts(req, res, next) {
    Contract.find({}, (err, contracts) => {
      let contractMap = {};

      contracts.forEach((contract) => {
        contractMap[contract._id] = contract;
      });
      res.send(contractMap);
    });
  },

  // **************************************************************************
  // Update
  // **************************************************************************

  // done
  // update contract found by Id
  async updateContractById(req, res, next) {
    const contractProps = req.body;

    //Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
    const contract = await Contract.findByIdAndUpdate(req,params.contractId, contractProps, {new: true});

    res.send(contract);
  },

  // **************************************************************************
  // Delete
  // **************************************************************************

  // done
  // find a contract by their contract id and delete them, and return their object
  async deleteContractById(req, res, next) {

    // !!!!!
    // need to get all users involved and also remove it form their accounts
    // !!!!!
    const contract = await Contract.findByIdAndDelete(req.params.contractId);

    res.send(contract);
  },

  // **************************************************************************
  // Blockchain
  // **************************************************************************


  // done
  // find a contract by a specific id, then send it to the farm for compilation
  async compileContractById(req, res, next) {
    const contract = await Contract.findById(req.params.contractId);

    // make a call to our deployment server
    const status = await axios.post("https://snowlabsdev-deploy.herokuapp.com/deploy-api/compile/", {
      contractId: contract._id,
      contractType: contract.contractType
    });

    // update the React app that we're working on compilation
    res.send(status);
  },

  // done
  // find a contract by a specific id, then send it to the farm for deployment
  async deployContractById(req, res, next) {
    const contract = await Contract.findById(req.params.contractId);

    // make a call to our deployment server
    const status = await axios.post("https://snowlabsdev-deploy.herokuapp.com/deploy-api/deploy/", {
      contractId: contract._id,
      ethABI: contract.ethABI,
      ethBytecode: contract.ethBytecode,
      arguments: contract.arguments
    });

    // update the React app that we're working on deployment
    res.send(status);
  },
};

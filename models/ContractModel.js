const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  /*
  owner: { // use hash(phoneNumbers) - still need to finish in UserModel
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  */
  members: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    role: {
      type: String,
      enum: ['member', 'admin']
    },
    todos: [String],
  }],
  contractType: { // SingleIssueBallot, MultiIssueBallot, etc
    type: String, // use this to parse the info needed for Mongo
  },
  solidityContract: {
    type: Schema.Types.ObjectId, // Each contract will have it's own model that we can call
    ref: 'solidity'
  },
  ethAddress: { // transaction address. If blank, it serves as a proxy to deployment
    type: String,
  },
  ethABI: { // abi interface for the contract (need for React and deployment)
    type: Schema.Types.Mixed,
  },
  ethBytecode: {
    type: Schema.Types.Mixed,
  },
  arguments: [{ // will remove once "contractInfo" variable is fully implemented
    type: Schema.Types.Mixed,
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Draft'],
    /*
    Active: Deployed to Eth
    Inactive: Deployed, completed
    Draft: Not deployed
    */
  }
});

// ############################################################################
// Virtual Attributes
// ############################################################################
/*
ContractSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});
*/

const Contract = mongoose.model('contract', ContractSchema);

module.exports = Contract;

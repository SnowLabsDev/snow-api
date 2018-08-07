const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SoliditySchema = require('./contracts/SoliditySchema');

const ContractSchema = new Schema({
  owner: { // use hash(phoneNumbers) - still need to finish in UserModel
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  contractType: { // SingleIssueBallot, MultiIssueBallot, etc
    type: String,
  },
  contractInfo: { // This is going to hold the info about the contract
    type: SoliditySchema // Each contract will have it's own model that we'll have to parse
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
  }]
});

// ############################################################################
// Virtual Attributes
// ############################################################################

/* removed until I am confident I want multiple owners
ContractSchema.virtual('ownerCount').get(function() {
  return this.owners.length;
});
*/

ContractSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

const Contract = mongoose.model('contract', ContractSchema);

module.exports = Contract;

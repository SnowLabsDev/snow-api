const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  ethAddress: { // transaction address. If blank, it serves as a proxy to deployment
    type: String,
  },
  ethABI: { // abi interface for the contract (need for React and deployment)
    type: Schema.Types.Mixed,
  },
  ethBytecode: {
    type: Schema.Types.Mixed,
  },
  arguments: [{ // incorrect arguments right now
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

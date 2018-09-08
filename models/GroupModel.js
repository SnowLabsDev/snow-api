const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  name: String,
  members: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    role: {
      type: String,
      enum: ['member', 'admin']
    },
    todos: [String]
  }],
  contracts: [{
    type: Schema.Types.ObjectId,
    ref: 'contract',
  }],
  // will eventually have posts as well
});

// ############################################################################
// Virtual Attributes
// ############################################################################

ContractSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

const Contract = mongoose.model('contract', ContractSchema);

module.exports = Contract;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArgumentSchema = new Schema({
  name: String,
  description: String,
  value: Schema.Types.Mixed
});

const FunctionSchema = new Schema({
  name: String,
  description: String,
  arguments: [ArgumentSchema]
});


const SingleIssueBallotSchema = new Schema({
  arguments: { // an object containing needed arguments
    proposalName: {
      type: String,
      required: true,
      alias: 'c0' // 'c' for constructor arguments, 0 for order in array
    },
    invites: {
      type: [String],
      required: true,
      alias: 'c1'
    }
  }, /*
  functions: {
    vote: { // cast a vote
      arguments: {
        userAddress: { // address of the user attempting to vote (validation done in contract)
          type: String,
          required: true,
        },
        userVote: { // -1, 0, 1, further validation done in contract
          type: Number,
          min: -1,
          max: 1
        }
      },
      alias: 'f0' // 'f' for function, 0 for order to display
    },
    closeBallot: {
      arguments: {}, // none needed
      alias: 'f1',
    },
    getVotersArray: {
      arguments: {}, // none needed
      alias: 'f2'
    },
  } */
});

// ############################################################################
// Virtual Attributes
// ############################################################################



const SingleIssueBallot = mongoose.model('sib', SingleIssueBallotSchema);

module.exports = SingleIssueBallot;

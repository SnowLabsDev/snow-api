const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FunctionSchema = new Schema({
  name: String,
  description: String,
  visibility: {
    type: String, // 'all', 'owner', 'participant', 'admin'
    default: 'all'
  },
  arguments: [{
    type: Schema.Types.ObjectId,
    ref: 'parameter'
  }],
  outputs: [{
    type: Schema.Types.ObjectId,
    ref: 'parameter'
  }]
});

const Func = mongoose.model('func', FunctionSchema);

module.exports = Func; // 'func/Func because 'Function' is a reserved word

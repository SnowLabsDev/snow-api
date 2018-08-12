const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterSchema = new Schema({
  name: String,
  visibility: {
    type: String, // 'all', 'owner', 'participant', 'admin'
    default: 'all'
  },
  description: String,
  value: String // just do a string of the type
});

const Parameter = mongoose.model('parameter', ParameterSchema);

module.exports = Parameter;

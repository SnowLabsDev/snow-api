const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterSchema = new Schema({
  name: String,
  description: String,
  value: Schema.Types.Mixed
});

const FunctionSchema = new Schema({
  name: String,
  description: String,
  arguments: [ParameterSchema],
  outputs: [ParameterSchema]
});


const SoliditySchema = new Schema({
  type: String,
  description: String,
  constructorArguments: [ParameterSchema],
  functions: [FunctionSchema]
});

// ############################################################################
// Virtual Attributes
// ############################################################################

SoliditySchema.virtual('functionCount').get(function() {
  return this.functions.length;
});

SoliditySchema.virtual('argumentCount').get(function() {
  return this.constructorArguments.length;
});


const Solidity = mongoose.model('sib', SoliditySchema);

module.exports = Solidity;

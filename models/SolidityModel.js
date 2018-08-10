const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoliditySchema = new Schema({
  type: String,
  description: String,
  constructorArguments: [{
    type: Schema.Types.ObjectId,
    ref: 'parameter',
  }],
  functions: [{
    type: Schema.Types.ObjectId,
    ref: 'func',
  }],
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


const Solidity = mongoose.model('solidity', SoliditySchema);

module.exports = Solidity;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  pin: {
    type: String,
  },
  ownContracts: [{ // contracts owning/administering
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }],
  inContracts: [{ // contracts participating in
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }]
});

// ############################################################################
// Virtual Attributes
// ############################################################################
UserSchema.virtual('ownCount').get(function() {
  return this.ownContracts.length;
});

UserSchema.virtual('inCount').get(function() {
  return this.inContracts.length;
});

// Create and export Schema
const User = mongoose.model('user', UserSchema);

module.exports = User;

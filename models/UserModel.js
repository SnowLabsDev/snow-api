const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { // will want to do first name, last name object
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
  ownContracts: [{ // contracts that are deployed and being owning/administering
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }],
  inContracts: [{ // contracts that are deployed, and being participated in
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }],
  draftContracts: [{ // contracts that haven't been deployed
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }],
  archivedContracts: [{ // contracts that are completed
    type: Schema.Types.ObjectId,
    ref: 'contract'
  }],

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

UserSchema.virtual('ethAddress').get(function() {

  idString = String(this._id);
  ethAddress = "0x0000000000000000";
  return ethAddress + idString;
})

// Create and export Schema
const User = mongoose.model('user', UserSchema);

module.exports = User;

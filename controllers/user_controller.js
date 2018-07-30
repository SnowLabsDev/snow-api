const User = require('../models/UserModel');
const Contract = require('../models/ContractModel');

module.exports = {

  // **************************************************************************
  // Create
  // **************************************************************************

  // done
  // create a single user with full paramaters
  async createUser(req, res, next) {
    const userProps = req.body;
    const user = new User(userProps);

    await user.save();
    res.send(user);
  },

  // create a user without a name. Would be called in contract with unregistered users
  createSingleHeadless(req, res, next) {
    res.send({"function": "single headless"});
  },

  // create multiple users without a names. used like singleheadless
  createMultiHeadless(req, res, next) {
    res.send({"function": "multi headless"});
  },

  // **************************************************************************
  // Read
  // **************************************************************************

  // done
  // get a single user by their Id
  async getUserById(req, res, next) {
    const user = await User.findById(req.params.userId);

    res.send(user);

  },

  // done
  // get a signle user by their phone number
  async getUserByPhone(req, res, next) {
    const user = await User.findOne({req.params.userPhone});

    res.send(user);
  },

  // done
  // get all users, no ranges
  getUsers(req, res, next) {
    User.find({}, (err, users) => {
      let userMap = {};

      users.forEach((user) => {
        userMap[user._id] = user;
      });
      res.send(userMap);
    });
  },

  // **************************************************************************
  // Update
  // **************************************************************************

  // done
  // find a single user by their id and update their info
  async updateUserById(req, res, next) {
    const userProps = req.body;

    //Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
    const user = await User.findByIdAndUpdate(req,params.userId, userProps, {new: true});

    res.send(user);
  },

  // done
  // find a single user by their phone number and update their info
  async updateUserByPhone(req, res, next) {
    const userProps = req.body;

    //Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
    const user = await User.findOneAndUpdate({"phone": req,params.userPhone}, userProps, {new: true});

    res.send(user);
  },

  // **************************************************************************
  // Delete
  // **************************************************************************

  // done
  // find a single user by their user id and delete them, and return their object
  async deleteUserById(req, res, next) {
    await user = await User.findByIdAndDelete(req.params.userId);

    res.send(user);
  },

  // done
  // find a single user by their phone number and delete them, and return their object
  async deleteUserByPhone(req, res, next) {
    await user = await User.findOneAndDelete(req.params.userPhone);

    res.send(user);
  },
};

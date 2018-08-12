const Solidity = require('../models/SolidityModel');
const Func = require('../models/FuncModel');
const Parameter = require('../models/ParameterModel');

module.exports = {
  async createSingleIssueBallot(req, res, next) {
    const SingleIssueBallot = new Solidity({
      type: "SingleIssueBallot",
      description: "One proposal, N voters, one vote per voter",
      constructorArguments: [],
      functions: []
    });

    // #########################################################################
    // Constructor Arguments
    // #########################################################################

    const proposalName = new Parameter({
      name: "proposalName",
      description: "the proposal shown to voting users",
      visibibility: 'all',
      value: "String"
    });

    const invites = new Parameter({
      name: "invites",
      description: "the 'ethAddress' parameter of the User",
      visibibility: 'all',
      value: "Array"
    });

    SingleIssueBallot.constructorArguments.push(proposalName._id, invites._id)

    // #########################################################################
    // Functions
    // #########################################################################

    // vote arguments
    const userAddress = new Parameter({
      name: "userAddress",
      description: "the address of the voting user",
      visibibility: 'all',
      value: "String"
    });

    const userVote = new Parameter({
      name: "userVote",
      description: "the user's vote",
      visibibility: 'all',
      value: "Number"
    });

    const vote = new Func({
      name: "vote",
      description: "let valid voter with valid vote cast their vote",
      visibibility: 'participant',
      arguments: [],
    });

    const closeBallot = new Func({
      name: "closeBallot",
      description: "allow the manager to close the ballot",
      visibibility: 'owner',
    });

    const getVotersArray = new Func({
      name: "getVotersArray",
      description: "return an array of 'ethAddress' parameter from UserSchema",
      visibibility: 'owner',
    });

    vote.arguments.push(userAddress._id, userVote._id);

    SingleIssueBallot.functions.push(vote._id, closeBallot._id, getVotersArray._id);

    await Promise.all([
      proposalName.save(),
      invites.save(),
      vote.save(),
      closeBallot.save(),
      getVotersArray.save(),
      SingleIssueBallot.save()
    ]);

    res.send(SingleIssueBallot);

    },
};

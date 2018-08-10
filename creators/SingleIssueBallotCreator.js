const Solidity = require('../models/SolidityModel');
const Func = require('../models/FuncModel');
const Parameter = require('../models/ParameterModel');

const SingleIssueBallot = new Solidity({
  type: "SingleIssueBallot",
  description: "One proposal, N voters, one vote per voter",
  constructorArguments: [],
  functions: []
});

// ############################################################################
// Constructor Arguments
// ############################################################################


const proposalName = new Parameter({
  name: "proposalName",
  description: "the proposal shown to voting users",
  value: "String"
});

const invites = new Parameter({
  name: "invites",
  description: "the 'ethAddress' parameter of the User",
  value: "Array"
});

SingleIssueBallot.constructorArguments.push(proposalName._id, invites._id)

// ############################################################################
// Functions
// ############################################################################

// vote arguments
const userAddress = new Parameter({
  name: "userAddress",
  description: "the address of the voting user",
  value: "String"
});

const userVote = new Parameter({
  name: "userVote",
  description: "the user's vote",
  value: "Number"
});

const vote = new Func({
  name: "vote",
  description: "let valid voter with valid vote cast their vote",
  arguments: [],
});

const closeBallot = new Func({
  name: "closeBallot",
  description: "allow the manager to close the ballot",
});

const getVotersArray = new Func({
  name: "getVotersArray",
  description: "return an array of 'ethAddress' parameter from UserSchema"
});

vote.arguments.push(userAddress._id, userVote._id);

SingleIssueBallot.functions.push(vote._id, closeBallot._id, getVotersArray._id);

//SingleIssueBallot.save(); //rename to SingleIssueBallot once confirmed working

await Promise.all([
  proposalName.save(),
  invites.save(),
  vote.save()
  closeBallot.save(),
  getVotersArray.save(),
  SingleIssueBallot.save()
]);

console.log('promised');

/*

alright so it looks like we have a successful form of this singleissueballot

so now we have to do what?
1) save it to mongoose
2) edit the contract creation to search for this contract type by id and name
3) then we add this id to it and return it


Also, FIX YOUR FUCKING FILE STRUCTURE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
1) create a new folder extracted out for the scripts that create these models, get it out of the test directory --- DONE
2) just put all the schemas in one spot --- DONE
*/

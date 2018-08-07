
const SoliditySchema = require('../../../../models/contracts/SoliditySchema');

const testContract = new SoliditySchema({
  type: "SingleIssueBallot",
  description: "One proposal, N voters, one vote per voter",
  constructorArguments: [
    {
      name: "proposalName",
      description: "the proposal shown to voting users",
    },
    {
      name: "invites",
      description: "the 'ethAddress' parameter of the UserSchema"
    }
  ],
  functions: [
    {
      name: "vote",
      description: "let valid voter with valid vote cast their vote",
      arguments: [
        {
          name: "userAddress",
          description: "the address of the voting user"
        },
        {
          name: "userVote",
          description: "the user's vote"
        }
      ]
    }, // end vote
    {
      name: "closeBallot",
      description: "allow the manager to close the ballot",
    }, // end closeBallot
    {
      name: "getVotersArray",
      description: "return an array of 'ethAddress' parameter from UserSchema"
    }
  ]
});

testContract.save();

//console.log(testContract.functionsArray);

console.log(testContract);
console.log('\n\n\n\n\n');
console.log(testContract.functionCount);
console.log(testContract.argumentCount);
console.log('\n\n\n\n\n');

function vote() {
  console.log('vote success');
}
function closeBallot() {
  console.log('closeBallot success');
}
function getVotersArray() {
  console.log('getVotersArray success');
}


for (let i=0; i < testContract.functionCount; i++) {
  console.log(i);
  //window[testContract.functions[i].name]; //works in browser, but we're running in API
  global[testContract.functions[i].name]();

}

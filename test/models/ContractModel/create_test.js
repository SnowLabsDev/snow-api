const assert = require('assert');
const User = require('../../../models/UserModel');
const Contract = require('../../../models/ContractModel');
const { address1, address2, abi } = require('./contract_details');

describe('Creates records', () => {

  let tyler, alec, chris;

  beforeEach((done) => {
    tyler = new User({ name: 'Tyler', phone: '0000000000' });
    alec = new User({ name: 'Alec', phone: '1111111111' });
    chris = new User({ name: 'Chris', phone: '2222222222' });



    Promise.all([tyler.save(), alec.save(), chris.save()])
      .then(() => done());
  });

  it('saves a new contract', (done) => {
    const contract = new Contract({
      owner: tyler.phone,
      participants: [alec.phone, chris.phone],
      contractType: 'SingleIssueBallot',
      ethAddress: address1,
      ethABI: abi
    });

    contract.save()
      .then(() => assert(!contract.isNew))
      .then(() => assert(contract.owner === tyler.phone))
      .then(() => assert(contract.participants[0] === alec.phone))
      .then(() => assert(contract.participants[1] === chris.phone))
      done();
  });

  it('can add a contract to a user', (done) => {
    const contract2 = new Contract({
      owner: tyler.phone,
      particpants: [chris.phone],
      contractType: 'SingleIssueBallot',
      ethAddress: address2,
      ethABI: abi
    });

    contract2.save()
      .then(() => {
        User.findOne({ phone: tyler.phone })
        .then((user) => {
          user.ownContracts.push(contract2);
          return user.save();
        })
        .then(() => User.findOne({ phone: tyler.phone }))
        .then((user) => {
          assert(user.ownContracts.length === 1);
          done();
        });
      });
    });
});

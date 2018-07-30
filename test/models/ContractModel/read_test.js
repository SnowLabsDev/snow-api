const assert = require('assert');
const User = require('../../../models/UserModel');
const Contract = require('../../../models/ContractModel');
const { address1, address2, abi } = require('./contract_details');

describe('reads records', () => {
  let tyler, alec, chris;

  beforeEach((done) => {
    tyler = new User({ name: 'Tyler', phone: '0000000000' });
    alec = new User({ name: 'Alec', phone: '1111111111' });
    chris = new User({ name: 'Chris', phone: '2222222222' });

    const contract1 = new Contract({
      owner: tyler.phone,
      contractType: 'SingleIssueBallot',
      ethAddress: address1,
      ethABI: abi
    });
    // not sure how to do this in declaration
    contract1.participants.push(alec._id);

    const contract2 = new Contract({
      owner: tyler.phone,
      contractType: 'SingleIssueBallot',
      ethAddress: address2,
      ethABI: abi
    });

    // not sure how to do this in declaration
    contract2.participants.push(chris._id);

    tyler.ownContracts.push(contract1._id, contract2._id);
    alec.inContracts.push(contract1._id);
    chris.inContracts.push(contract2._id);

    Promise.all([ tyler.save(), alec.save(), chris.save(),
                  contract1.save(), contract2.save()
                ])
      .then(() => done());
  });

  it('can pull the contracts owned by a user', (done) => {
    User.findOne({ phone: tyler.phone })
      .then((user) => {
        assert(user.name === tyler.name);

        Contract.findById(user.ownContracts[0])
        .then((contract) => {
          assert(contract.owner === tyler.phone);
          assert(contract.participants[0] === alec._id);
          done();
        });
        done();
      });
  });

  it('can pull the contracts participated in by a user', (done) => {
    User.findOne({ phone: alec.phone })
      .then((user) => {
        assert(user.name === alec.name);

        Contract.findById(user.inContracts[0])
        .then((contract) => {
          console.log(contract);
          assert(contract.owner === tyler.phone);
          assert(contract.participants[0] === user._id);
          done();
        });
        done();
      });
  });
});

/*
const assert = require('assert');
const User = require('../../../models/ContractModel');

describe('Updates records', () => {
  let tyler;

  beforeEach((done) => {
    tyler = new User({ name: 'Tyler', phone: '0000000000' });

    tyler.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'TOB');
        done();
      });
  }

  it('can find a user with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(tyler._id, { name: 'TOB' }),
      done
    );
  });

  it('can find a user by a phone number and update', (done) => {
      User.findOneAndUpdate({ phone: tyler.phone }, { phone: '0000000001' })
        .then(() => User.findById(tyler._id))
        .then((user) => {
          assert(user.phone === '0000000001');
          done();
        });
  });

});
*/

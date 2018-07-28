const assert = require('assert');
const User = require('../../../models/UserModel');

describe('Deletes records', () => {
  let tyler;

  beforeEach((done) => {
    tyler = new User({ name: 'Tyler', phone: '0000000000' });

    tyler.save()
      .then(() => done());
  });

  it('removes can remove a user', (done) => {
    tyler.remove()
      .then(() => User.findById(tyler._id))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('removes a user found by id', (done) => {
    User.findByIdAndRemove(tyler._id)
      .then(() => User.findById(tyler._id))
      .then((user) => {
        assert(user === null);
        done();
    });
  });

  it('removes a user found by phone', done => {
    User.remove({ phone: tyler.phone })
      .then(() => User.findById(tyler._id))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

});

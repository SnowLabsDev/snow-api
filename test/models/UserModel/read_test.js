const assert = require('assert');
const User = require('../../../models/UserModel');

describe('reads records', () => {
  let tyler, alec;

  beforeEach((done) => {
    tyler = new User({ name: 'Tyler', phone: '0000000000' });
    alec = new User({ name: 'Alec', phone: '1111111111' });

    Promise.all([tyler.save(), alec.save()])
      .then(() => done());
  });

  it('finds a user with a particular id', (done) => {
    User.findById(tyler._id)
      .then((user) => {
        assert(user.name === 'Tyler');
        done();
      });
  });

  it('finds a user with a particular phone number', (done) => {
    User.findOne({ phone: tyler.phone })
      .then((user) => {
        assert(user.phone === '0000000000');
        done();
      });
  });

  it('finds all users named Tyler', (done) => {
    User.find({ name: 'Tyler' })
      .then((users) => {
        assert(users[0]._id.toString() === tyler._id.toString());
        done();
      });
  });
});

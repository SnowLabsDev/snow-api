const assert = require('assert');
const User = require('../../../models/UserModel');


describe('Creates records', () => {
  it('saves a new user', (done) => {

    const tyler = new User({ name: 'Tyler', phone: '0000000000' });

    tyler.save()
      .then(() => {
        assert(!tyler.isNew);
        done();
      });
  });
});

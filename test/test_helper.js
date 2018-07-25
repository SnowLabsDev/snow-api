const mongoose = require('monoogse');

/* PSEUDO CODE
before(done => {
  mongoose.connect()
  mongoose.connection
    .once('open', () => done())
    .on('error' , error => {
      console.warn('Warning', error);
  });
});

beforeEach(done => {
  const { X } = mongoose.connection.collections; // get collection from mongo?
  X.drop() // drop that collection
    .then(() => X.ensureIndex()) // index something for searching
    .then() => done())
    .catch(() => done());
});
*/

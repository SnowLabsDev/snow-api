const mongoose = require('mongoose');
const { db_mvp_USERNAME, db_mvp_PASSWORD } = require('./mongo_credentials');
// remember to run mongod before connect with RoboMongo


mongoose.Promise = global.Promise;

before((done) => {
  //mLab === mongodb://username:password@ds155461.mlab.com:55461/mvp
  // localhost === 'mongodb://localhost/users_test'
  const mLabPath = "mongodb://" + db_mvp_USERNAME + ":" + db_mvp_PASSWORD + "@ds155461.mlab.com:55461/mvp";
  mongoose.connect(mLabPath);
  mongoose.connection
    .once('open', () => {
      console.log('good to go')
      done();
    })
    .on('error', (error) => {
      console.log('this is the warning to the warning!');
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});

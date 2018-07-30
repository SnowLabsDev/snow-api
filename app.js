const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const { db_mvp_USERNAME, db_mvp_PASSWORD } = require('./mongo_credentials');

const app = express();

// set promise type
mongoose.Promise = global.Promise;

// setup and test connection
const mLabPath = "mongodb://" + db_mvp_USERNAME + ":" + db_mvp_PASSWORD + "@ds155461.mlab.com:55461/mvp";
mongoose.connect(mLabPath);
mongoose.connection
  .once('open', () => {
    console.log('mongoose connection is good to go')
  })
  .on('error', (error) => {
    console.log('this is the warning to the warning!');
    console.warn('Warning', error);
  });


// setup app
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

module.exports = app;

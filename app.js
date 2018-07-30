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
mongoose.connect('mongodb://localhost:27017/snow-api-test');
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

routes(app);

app.get('/', (req, res) => {
  res.status(200).send('Wassup, world!').end();
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;

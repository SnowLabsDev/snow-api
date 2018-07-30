const app = require('./app');

// for heroku deployment
const PORT = process.env.PORT;

app.listen(PORT);

/* for local testing only
app.listen(3050, () => {
  console.log('API SERVER');
  console.log('Running on port 3050');
  console.log('CTRL + C to stop');
});
*/

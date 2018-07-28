const app = require('./app');
//const PORT = process.env.PORT;

//app.listen(PORT);

app.listen(3050, () => {
  console.log('Running on port 3050');
  console.log('CTRL + C to stop');
});

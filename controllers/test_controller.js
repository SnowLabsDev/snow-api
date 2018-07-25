module.exports = {

  // export the responses that we have at each of these locations
  test(req, res, next) {
    res.send({ test: 'plz work' });
  },
};

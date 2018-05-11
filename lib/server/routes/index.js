const express = require('express');
const api = require('./api');

const router = express.Router();

module.exports = function(options) {

  router.use('/api', api(options));

  router.get('/', (req, res) => {
    res.render('index', {
      message: 'HELLO EXPRESS!'
    });
  });
  return router;
};

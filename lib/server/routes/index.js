const express = require('express');
const api = require('./api');
const pages = require('./pages');

const router = express.Router();

module.exports = function(options) {

  router.use('/api', api(options));
  router.use('/', pages(options));

  return router;
};

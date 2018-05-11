const express = require('express');
const api = require('./api');
const pages = require('./pages');

const router = express.Router();

module.exports = function(options) {

  router.use('/', pages(options));
  router.use('/api', api(options));
  
  return router;
};

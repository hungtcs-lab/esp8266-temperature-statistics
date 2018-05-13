const express = require('express');
const logger = require('../../../utils/logger');

const router = express.Router();

module.exports = function(options) {
  const { storage } = options;

  router.get('/', (req, res) => {
    res.render('index');
  });

  router.all('*', (req, res) => {
    res.redirect('/');
  });

  return router;
};

const express = require('express');
const logger = require('../../../utils/logger');

const router = express.Router();

module.exports = function(options) {
  const { storage } = options;

  router.get('/', (req, res) => {
    res.redirect('index');
  });

  router.get('/index', (req, res) => {
    res.render('index');
  });

  return router;
};

const express = require('express');
const logger = require('../../../utils/logger');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;

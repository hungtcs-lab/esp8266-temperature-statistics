const express = require('express');
const api = require('./api');
const pages = require('./pages');

const router = express.Router();

router.use('/api', api);
router.use('/', pages);

module.exports = router;

const express = require('express');
const api = require('./api');

const router = express.Router();

router.use('/api', api);

router.get('/', (req, res) => {
  res.render('index', {
    message: 'HELLO EXPRESS!'
  });
});

module.exports = router;

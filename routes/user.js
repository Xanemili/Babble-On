const express = require('express');
const router = express.Router();

router.get('/log-in', (req, res) => {
  res.render('log-in')
})

router.get('/sign-up', (req, res) => {
  res.render('sign-up')
})

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('babble-create')
})

router.get('/1', (req, res) => {
  res.render('babble')
})

module.exports = router;

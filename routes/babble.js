const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('babble-create')
})

router.get('/:id', (req, res) => {
  res.render('babble', )
})

router.get('/:id(\\d+)', (req, res) => {
  res.render('babble')
})

module.exports = router;

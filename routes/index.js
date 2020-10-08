const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('home');
  })

  router.get('/sign-up', (req, res) => {
    res.render('sign-up')
  })

  router.get('/log-in', (req, res) => {
        res.render('log-in')
})

router.get('/welcome', (req, res) => {
  res.render('welcome')
})

module.exports = router;

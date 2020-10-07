const express = require('express');
const router = express.Router();
const { User } = require('../db/models');

router.get('/', async(req,res) => {
  res.render('profile');
  })

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
  })

router.get('/log-in', (req, res) => {
        res.render('log-in')
})

router.get('/babbles/:id(\\d+)', (req, res) => {
  res.render('babble')
});

module.exports = router;

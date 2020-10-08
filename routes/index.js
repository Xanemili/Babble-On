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

//do fetch here and then pass the object

router.get('/babbles/create', (req, res) => {
  res.render('babble-create')
});

module.exports = router;

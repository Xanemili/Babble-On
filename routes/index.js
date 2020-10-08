const express = require('express');
const router = express.Router();
const { User, Topic, Babble } = require('../db/models');

router.get('/', async(req,res) => {
  res.render('profile');
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

router.get('/babbles/:id(\\d+)', (req, res) => {
  res.render('babble')
});

router.get('/babbles/create', async(req, res) => {
  const topics = await Topic.findAll();
  res.render('babble-create', { topics })
});


router.get('/babbles', async(req, res) => {
  const topics = await Topic.findAll();
  res.render('babble-feed', { topics });
});


module.exports = router;

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

<<<<<<< HEAD

=======
>>>>>>> 511f4c7ec8251f38df023ef509e70050719dc0be
router.get('/babbles/create', async(req, res) => {
  const topics = await Topic.findAll();
  res.render('babble-create', { topics })
});

<<<<<<< HEAD
router.get('/babbles', (req, res) => {
  res.render('babble-feed')
=======

router.get('/babbles', async(req, res) => {
  const topics = await Topic.findAll();
  res.render('babble-feed', { topics });
>>>>>>> 511f4c7ec8251f38df023ef509e70050719dc0be
});


module.exports = router;

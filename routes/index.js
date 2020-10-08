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

router.get('/babbles/:id(\\d+)', (req, res) => {
  res.render('babble')
});

<<<<<<< HEAD



router.get('/babbles/create', async(req, res) => {
  const topics = await Topic.findAll();

  res.render('babble-create', { topics })
=======
router.get('/babbles', (req, res) => {
  res.render('babble-feed')
>>>>>>> 9a20b9c... Fixing babble-feed.js
});

module.exports = router;

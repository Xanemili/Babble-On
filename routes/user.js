const express = require('express');
const router = express.Router();

router.get('/log-in', (req,res) => {
  res.render('log-in')
})


module.exports = router;

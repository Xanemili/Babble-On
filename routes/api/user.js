const express = require('express');

const {
  check
} = require('express-validator');
const bcrypt = require('bcryptjs');

const {
  asyncHandler,
  handleValidationErrors
} = require('../utils');

const {
  User,
  Babble
} = require('../../db/models');


const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName: username,
    hashedPassword,
    email,
    firstName,
    lastName
  });

  return;

  // implement token

}))


module.exports = router;

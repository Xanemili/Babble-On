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

const validateUserInputs = [
  check('username')
    .exists( { checkFalsy : true })
    .withMessage('Please enter a username')
    .isLength( { max: 30 })
    .withMessage('Username must not exceed 30 characters'),
  check('password')
    .exists( { checkFalsy : true })
    .withMessage('Please enter password'),
  check('firstName')
    .exists( { checkFalsy : true })
    .withMessage('Please enter your first name')
    .isLength( { max: 25 })
    .withMessage('First Name must not exceed 25 characters'),
  check('lastName')
    .exists( { checkFalsy : true })
    .withMessage('Please enter your last name')
    .isLength( { max: 25 })
    .withMessage('Last Name must not exceed 25 characters'),
  check('email')
    .exists( { checkFalsy : true })
    .withMessage('Please enter email address')
    .isEmail()
    .withMessage('Please enter a valid e-mail address'),
]

router.post('/', validateUserInputs, handleValidationErrors, asyncHandler(async (req, res, next) => {
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

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  // const id = parseInt(req.params.id, 10)
  const user = await User.findByPk(req.params.id, { attributes: [ "userName", "firstName", "email", "lastName"] });

  res.json(user)


}))

module.exports = router;

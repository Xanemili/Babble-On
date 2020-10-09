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
  Babble,
  Follower
} = require('../../db/models');

const {
  getUserToken,
  requireAuth
} = require('../../auth');
const follower = require('../../db/models/follower');

const router = express.Router();

const validateUserInputs = [
  check('username')
    .exists( { checkFalsy : true })
    .withMessage('Please enter a username')
    .isLength( { max: 30 })
    .withMessage('Username must not exceed 30 characters'),
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
]

const validateEmailAndPassword = [
  check('email')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please enter email address')
    .isEmail()
    .withMessage('Please enter a valid e-mail address'),
  check('password')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please enter password')
]

router.post('/', validateUserInputs, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
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

  const token = getUserToken(user);
  res.status(201).json({
    user: {
      id: user.id
    },
    token
  })

}))

router.post('/token', validateEmailAndPassword, asyncHandler(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user || !user.validatePassword(password)) {
    const err = new Error('Login Failed');
    err.status = 401;
    err.title = "Login Failed";
    err.errors = ["The provided credentials were not valid"];
    return next(err);
  }

  const token = getUserToken(user);
  res.json({
    user: {
      id: user.id
    },
    token
  })
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  // const id = parseInt(req.params.id, 10)
  const user = await User.findByPk(req.params.id, { attributes: [ "userName", "firstName", "email", "lastName", "biography"] });

  res.json( {user} );
}));

router.get('/:id(\\d+)/babbles', asyncHandler( async(req, res, next) => {
  const babbles = await Babble.findAll({
    where: {
      userID: req.params.id
    },
    order: [['updatedAt', 'DESC']]
  })
  res.json({babbles});
}));


router.get('/:id(\\d+)/followers', asyncHandler(async (req, res, next) => {
  const followers = await Follower.findAll({
    where: {
      userID: req.params.id
    },
    order: [['updatedAt', 'DESC']]
  })
  res.json(followers)

}))

router.post('/:id(\\d+)/followers', requireAuth, asyncHandler(async (req, res, next) => {
  const {
    followerUserID
  } = req.body;

  const userID = parseInt(req.params.id, 10);


  const follow = await Follower.create({
    userID: userID,
    followerUserID: followerUserID
  });


}))

router.get('/:id(\\d+)/following', asyncHandler(async (req, res, next) => {
  const following = await Follower.findAll({
    where: {
      followerUserID: req.params.id
    },
    order: [['updatedAt', 'DESC']]
  })
  res.json(following)
}))



module.exports = router;

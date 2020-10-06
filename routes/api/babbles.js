const express = require('express');

const {
  check,
  validationResult
} = require('express-validator');

const {
  Babble,
  User
} = require('../../db/models');

const {
  requireAuth
} = require('../../auth');

const {
  asyncHandler,
  handleV,
  handleValidationErrors
} = require('../utils');

const router = express.Router();
router.use(requireAuth)

const babbleNotFoundErr = (id) => {
  const error = new Error();
  error.title = `Babble with ${id} does not exist`
  error.status = 404;
  return error;
}

const validateBabble = [
  check,
  check
]
router.get('/', asyncHandler(async (req, res, next) => {
  const {

  } = req.body;


}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const babble = await Babble.findByPk(req.params.id);

  if (!babble) {
    const error = babbleNotFoundErr(req.params.id)
    return next(error);
  } else {
    res.json({
      babble
    })
  }

}));

router.post('/', validateBabble, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const {
    title,
    subHeader,
    content,
    readTime,
    topicID
  } = req.body.tweet;

  const babble = await Babble.create({
    title,
    subHeader,
    content,
    readTime,
    topicID,
    userID: req.user.id
  });
  res.json({
    message: 'Babble was created!'
  })
}));

router.put(':/id(\\d+)', validateBabble, asyncHandler(async (req, res, next) => {
  const babble = await Babble.findOne({
    where: {
      id: req.params.id
    },
  });

  if (req.user.id !== babble.userID) {
    const err = new Error("Unauthorized");
    error.status = 401;
    err.message = "You are not authorized to edit this Babble.";
    err.title = "Unauthroized"
    throw err;
  }

  if (babble) {
    await babble.update({
      //insert logic to update
    })
  } else {
    next(babbleNotFoundErr(req.params.id))
  }
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const babble = await Babble.findByPk(req.params.id)

  if (req.user.id !== babble.userID) {
    const err = new Error("Unauthorized");
    error.status = 401;
    err.message = "You are not authorized to edit this Babble.";
    err.title = "Unauthroized"
    throw err;
  }

  if (babble) {
    await babble.destroy() //will need to derstroy comments associated as well

    res.json({
      message: `Deleted the Babble with ${id}`
    });
  } else {
    next(babbleNotFoundErr(req.params.id))
  }
}))

module.exports = router;

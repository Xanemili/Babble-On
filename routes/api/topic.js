const express = require('express');

const {
  check,
  validationResult
} = require('express-validator');
const router = express.Router();

const {
  Babble,
  User,
  Topic
} = require('../../db/models');

const {
  asyncHandler,
  handleValidationErrors
} = require('../utils');

const validateTopic = [
  check('')
]

router.get('/', asyncHandler(async (req, res, next) => {
  const topics = await Topic.findAll()
  res.json(topics)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const {} = req.body;
  await Topic.create({})
  res.status(201).json({
    message: 'topic was created'
  })
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const topic = await Topic.findByPk(req.params.id);
  res.json({
    topic
  });
}));

router.get('/search/:searchVal', asyncHandler(async (req, res, next) => {
  const search = req.params.searchVal;
  console.log('something')
  const babbles = await Babble.findAll({
    include: {
      model: Topic,
      where: {
        name: `${search}`
      },
    }

  });
  console.log(babbles)
  if (babbles) {
    res.json(
      babbles
    );
  } else {
    const err = new Error();
    err.title = 'No results were found for that search.';
    err.status = 404;
    next(err);
  }
}));


module.exports = router;

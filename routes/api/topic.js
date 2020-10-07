const express = require('express');

const {
  check,
  validationResult
} = require('express-validator');
const router = require('..');

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

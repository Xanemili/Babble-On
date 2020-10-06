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
  handleV
} = require('../utils');

const router = express.Router();
router.use(requireAuth)

const babbleNotFoundErr = (id) => {
  const error = new Error();
  error.title = `Babble with ${id} does not exist`
  error.status = 404;
  return error;
}

router.get('/', asyncHandler(async (req, res, next) => {
  const {

  } = req.body;


}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const babble = await Babble.findByPk(req.params.id);

  if (!babble) {
    const error = babbleNotFoundError(req.params.id)
    return next(error);
  } else {
    res.json({
      babble
    })
  }

}));

module.exports = router;

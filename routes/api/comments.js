const express = require('express');

const { check } = require('express-validator');

const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();




router.post('/stories/:id(\\d+)/comment', handleValidationErrors, asyncHandler( async (req, res, next) => {

}))

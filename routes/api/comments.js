const express = require('express');

const { check } = require('express-validator');
const {
  Comment
} = require('../../db/models/');

const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();



const validateCommentInputs = [
  check('commentText')
  .exists( { checkFalsy: true })
  .withMessage('Please enter comment')
  .isLength({
      max: 300
    })
    .withMessage('Comments cannot be greater than 280 characters long')
]



router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
          const commentId = req.params.commentId;
    const comment = await Comment.findByPk(commentId);

    if(comment){
        res.json({comment});
    } else{
        const err = new Error();
        err.title = 'Comment not found.';
        err.status = 404;
        next(err);
    }
}))



router.post('/', validateCommentInputs, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { commentText } = req.body;
  console.log(req)
    const comment = await Comment.create({
        comment: commentText,
        userID: req.user.id,
          postID: req.params.babbleId
    })
    res.status(201).json({ comment })
}))


router.patch('/:id(\\d+)', validateCommentInputs, handleValidationErrors, asyncHandler(async (req, res, next) => {
          const commentId = req.params.commentId;
    const { commentText } = req.body;
    const comment = await Comment.findByPk(commentId);
    if(comment) {
        await comment.update({ commentText });
        res.json({comment});
    }else {
        const err = new Error();
        err.title = 'Comment not found';
        err.status = 404;
        next(err);
    }
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    if(comment){
        await comment.destroy();
        res.status(204).end();
    }else {
        const err = new Error();
        err.title = 'Comment not found';
        err.status = 404;
        next(err);
    }
}))


module.exports = router;

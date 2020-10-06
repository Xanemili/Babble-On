const express = require('express');

const { check } = require('express-validator');
const { Comment } = require('../../db/models/comment');

const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();



const validateCommentInputs = [
    check(comment)
        .exists( { checkFalsy: true })
        .withMessage('Please enter comment')
]



router.get('/:id(\\d+', asyncHandler( async (req, res, next)=>{
    const commentId = req.params.id;
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



router.post('/babbles/:id(\\d+)/comment', validateCommentInputs, handleValidationErrors, asyncHandler( async (req, res, next) => {
    const { commentText } = req.body;

    const comment = await Comment.create({
        comment: commentText,
        userId: req.user.id
    })
    res.status(201).json({ comment })
}))


router.patch('/babbles/:id(\\d+)/comment', validateCommentInputs, handleValidationErrors, asyncHandler( async (req, res, next) => {
    const commentId = req.params.id;
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

router.delete('/babbles/:id(\\d+)/comment', asyncHandler( async (req, res, next) => {
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

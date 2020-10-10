const express = require('express');
const { Op } = require("sequelize");

const {
  check,
  validationResult
} = require('express-validator');

const {
  Babble,
  User,
  Comment,
  Topic
} = require('../../db/models');

const {
  requireAuth
} = require('../../auth');

const {
  asyncHandler,
  handleValidationErrors
} = require('../utils');

const router = express.Router();
const babbleNotFoundErr = (id) => {
  const error = new Error();
  error.title = `Babble with ${id} does not exist`
  error.status = 404;
  return error;
}

const validateBabble = [
  check('title')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please enter a title for your babble')
    .isLength({
      max: 100
    })
    .withMessage('Babble titles must be less than 100 characters long.'),
    check('subHeader')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please enter a Sub-Header for your babble')
    .isLength({
      max: 150
    })
    .withMessage('Sub-Headers must be less than 150 characters long.'),
    check('content')
    .exists({
      checkFalsy: true
    }).withMessage('Please enter content for your babble'),
    check('readTime')
    .exists({
      checkFalsy: true
    }).withMessage('Please enter an estimated read time for your babble'),
    check('topicID')
    .exists({
      checkFalsy: true
    }).withMessage('Please enter at least one topic for your babble')
]
const validateCommentInputs = [
  check('commentText')
  .exists({
    checkFalsy: true
  })
  .withMessage('Please enter comment')
  .isLength({
    max: 300
  })
  .withMessage('Comments cannot be greater than 280 characters long')
]

router.get('/', asyncHandler(async (req, res, next) => {
  const babbles = await Babble.findAll({
    include: [
      { model: User},
    ]
  })
  res.json(babbles)
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const babble = await Babble.findByPk(req.params.id, {
    include: [{
      model: User,
      required: true,
      attributes: ['userName', 'firstName', 'lastName', 'email']
    }, {
      model: Topic,
      attributes: ['name', 'description']
    }]
  });

  if (!babble) {
    const error = babbleNotFoundErr(req.params.id)
    return next(error);
  } else {
    res.json(
      babble
    )
  }

}));

router.post('/', requireAuth, validateBabble, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const {
    title,
    subHeader,
    content,
    readTime,
    topicID,
    url,
    userID
  } = req.body;

  await Babble.create({
    title,
    subHeader,
    content,
    readTime,
    topicID,
    url,
    userID
  });
  res.json({
    message: 'Babble was created!'
  });
}));

router.put('/:id(\\d+)', requireAuth, validateBabble, asyncHandler(async (req, res, next) => {
          const babble = await Babble.findOne({
    where: {
      id: req.params.id
    }
  });

  if (req.user.id !== babble.userID) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to edit this Babble.";
    err.title = "Unauthroized"
    throw err;
  }

  if (babble) {
const {
  title,
  subHeader,
  content,
  readTime,
  topicID,
  url,
  userID
} = req.body;

    await babble.update({
      title,
      subHeader,
      content,
      readTime,
      topicID,
      url,
      userID
    })
  } else {
    next(babbleNotFoundErr(req.params.id))
  }
  res.status(201).json({
    id: req.params.id
  })
}));

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const babble = await Babble.findOne({
    where: {
      id: req.params.id
    }
  });

  if (req.user.id !== babble.dataValues.userID) {
    const err = new Error("Unauthorized");
    error.status = 401;
    err.message = "You are not authorized to edit this Babble.";
    err.title = "Unauthroized"
    throw err;
  }

  if (babble) {
    await babble.destroy() //will need to derstroy comments associated as well

    res.json({
      message: `Deleted the Babble with ${req.params.id}`
    });
  } else {
    next(babbleNotFoundErr(req.params.id))
  }
}))

router.get('/:id(\\d+)/comments', asyncHandler(async (req, res, next) => {
  const comments = await Comment.findAll({
    where: {
      postID: req.params.id
    },
    include: {
      model: User,
      attributes: ['userName']
    }
  });

  res.json(comments);
}))

router.post('/:id(\\d+)/comments', requireAuth, validateCommentInputs, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const {
    commentText
  } = req.body;
  const comment = await Comment.create({
    comment: commentText,
    userID: req.user.id,
    postID: req.params.id
  })
const newComment = await Comment.findByPk(comment.id, {
      include: {
        model: User,
        required: true
      }
})
  res.status(201).json(
    newComment
  )
}));

router.get('/:id(\\d+)/comments/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findByPk(commentId, {});

  if (comment) {
    res.json({
      comment
    });
  } else {
    const err = new Error();
    err.title = 'Comment not found.';
    err.status = 404;
    next(err);
  }
}));

router.patch('/:id(\\d+)/comments/:id(\\d+)', requireAuth, validateCommentInputs, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const {
    commentText
  } = req.body;
  const comment = await Comment.findByPk(commentId);
  if (comment) {
    await comment.update({
      commentText
    });
    res.json({
      comment
    });
  } else {
    const err = new Error();
    err.title = 'Comment not found';
    err.status = 404;
    next(err);
  }
}));

router.delete('/:id(\\d+)/comments/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const commentId = req.params.id;
  const comment = await Comment.findByPk(commentId);
  if (comment) {
    await comment.destroy();
    res.status(204).end();
  } else {
    const err = new Error();
    err.title = 'Comment not found';
    err.status = 404;
    next(err);
  }
}))

router.get('/search/:searchVal', asyncHandler(async (req, res, next) => {
  const search = req.params.searchVal
  const babbles = await Babble.findAll({
    where: {
      title: {[Op.iLike]: `%${search}%`}
    }
  });
  if (babbles) {
    res.json(
      babbles
    );
  }else {
    const err = new Error();
    err.title = 'No results were found for that search.';
    err.status = 404;
    next(err);
  }
}));

module.exports = router;

const jwt = require('jsonwebtoken');
const bearer = require('express-bearer-token');

const {
  secret,
  expiresIn
} = require('./config').jwtConfig;
const {
  User
} = require('./db/models');

const getUserToken = (user) => {
  const userDataToken = {
    id: user.id,
    email: user.email
  }

  const token = jwt.sign({
    data: userDataToken
  }, secret, {
    expiresIn: parseInt(expiresIn, 10)
  });

  return token;
}

const restoreUser = (req, res, next) => {
  const {
    token
  } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end()
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {

    if (err) {
      err.status = 401;
      return next(err);
    }

    const {
      id
    } = jwtPayload.data

    try {
      req.user = await User.findByPK(id)
    } catch (error) {
      return next(error)
    }
    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end()
    }
    return next();
  })
}

const requireAuth = [bearer(), restoreUser]

module.exports = {
  getUserToken,
  requireAuth
}

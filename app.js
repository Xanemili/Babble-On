const express = require('express');
const morgan = require('morgan');
const path = require("path");

const app = express();

const indexRoutes = require('./routes');
const userRoutes = require('./routes/user');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'));
app.use(express.json());
app.use('/', indexRoutes);
app.use('/users', userRoutes)

app.use((req, res, next) => {
  const err = new Error('The page was not found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const acceptHeader = req.get("Accept");

  const errorData = {
    title: err.title || 'Server Error',
    message: err.message,
    // stack: isProduction ? null : err.stack
  }

  if (acceptHeader === 'text/html') {
    res.render('error-page', errorData);
  } else if (acceptHeader === 'application/json') {
    res.json(errorData);
  } else {
    res.send('Server Error');
  }
})


module.exports = app;

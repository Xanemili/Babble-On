const express = require('express');
const morgan = require('morgan');
const path = require("path");

const app = express();

const indexRoutes = require('./routes');
const babbleRoutes = require('./routes/babble')
const userAPIRoutes = require('./routes/api/user');
const babbleAPIRouter = require('./routes/api/babbles')


app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.json());
app.use('/', indexRoutes);
app.use('/api/users', userAPIRoutes);
app.use('/api/babbles', babbleAPIRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/users', userAPIRoutes)
app.use('/babbles', babbleRoutes)


app.use((req, res, next) => {
  const err = new Error('The page was not found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title,
    message: err.message,
    errors: err.errors,
  })


});


module.exports = app;

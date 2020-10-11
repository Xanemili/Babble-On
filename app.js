const express = require('express');
const morgan = require('morgan');
const path = require("path");

const app = express();

const indexRoutes = require('./routes');
const userAPIRoutes = require('./routes/api/user');
const babbleAPIRouter = require('./routes/api/babbles')
const topicsRouter = require('./routes/api/topic')

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.json());
app.use('/', indexRoutes);
app.use('/api/users', userAPIRoutes);
app.use('/api/babbles', babbleAPIRouter);
app.use('/api/topics', topicsRouter)
app.use(express.static(path.join(__dirname, "public")));


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

const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const handleAllError = require('./controllers/errorContoller');

//including middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Importing RouteHandlers
const mealRouter = require(`${__dirname}/routes/mealRouter`);
const userRouter = require(`${__dirname}/routes/userRouter`);

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/users', userRouter);

// this handle all unavailable routes
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on server`, 404);
  return next(err);
});

// when an error is supplied into the next function, it automatically calls the middleware with 4 parameters
app.use(handleAllError);

module.exports = app;

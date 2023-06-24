const express = require('express');
const app = express();
const morgan = require('morgan');

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

module.exports = app;

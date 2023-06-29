const AppError = require('../utils/appError');

// handles invalid token
const handleJWTError = () =>
  new AppError('Invalid token, please log in again', 401);

// handle token expiration
const handleJWTExpireError = () =>
  new AppError('Token has expired, login again', 401);

// this error is sent when on production mode
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

// handles error when in development
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    status: err.status,
    stack: err.stack,
  });
};

const handleAllError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'TokenExpiredError') err = handleJWTError();
    if (err.name === 'JsonWebTokenError') err = handleJWTError();

    sendProdError(err, res);
    return;
  }
};

module.exports = handleAllError;

// this error is sent when on production mode
const sendProdError = (err, res) => {
  console.log('ERROR🎉', err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error🧨🎃', err);
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

const handleAllErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    sendProdError(err, res);
    return;
  }
};

module.exports = handleAllErrors;

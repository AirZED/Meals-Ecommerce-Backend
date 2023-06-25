class AppError extends Error {
  constructor(message, statusCode) {
    //this built in error accepts only one argument, which is the message
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';

    //this removes this class from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

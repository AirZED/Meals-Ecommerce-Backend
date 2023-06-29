// this handles every error thrown at the request and sends this to an error handler
const catchAsync = (controllerFn) => {
  return (req, res, next) => {
    controllerFn(req, res, next).catch((err) => next(err));
  };
};

module.exports = catchAsync;

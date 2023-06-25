// this handles every error thrown at the request and sends this to an error handler
const catchAsync = async (controllerFn) => {
  return (req, res, next) => {
    controllerFn().catch(next);
  };
};

module.exports = catchAsync;

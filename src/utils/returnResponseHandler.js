const returnResponseFn = (data, statusCode, res) => {
  res.status(statusCode).json({
    status: 'success',
    data: {
      data,
    },
  });
};

module.exports = returnResponseFn;

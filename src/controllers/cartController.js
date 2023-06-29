const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const returnResponseFn = require('../utils/returnResponseHandler');

exports.getCartMeals = catchAsync(async (req, res, next) => {
  const cart = await Cart.find();

  if (!cart) next(new AppError('Cart items not found', 404));

  returnResponseFn(cart, 201, res);
});

exports.addToCart = catchAsync(async (req, res, next) => {});

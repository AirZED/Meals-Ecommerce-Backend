const Cart = require('../models/cartModel');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const returnResponseFn = require('../utils/returnResponseHandler');

// get cart meals
exports.getCartMeals = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await Cart.aggregate([
    { $match: { userId: userId } },
    {
      $lookup: {
        from: 'meals',
        localField: 'meals',
        foreignField: 'name',
        as: 'cart',
      },
    },
  ]);

  console.log(cart);
  // const [cart] = await Cart.find({ userId }).select('-__v');
  if (!cart) next(new AppError('Cart items not found', 404));
  returnResponseFn(cart, 201, res);
});

// edit cart
exports.updateCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { ...req.body } },
    { upsert: true, returnDocument: 'after' }
  ).select('-__v');

  if (!cart) {
    return next(new AppError('No cart has been updated'));
  }

  returnResponseFn(cart, 200, res);
});

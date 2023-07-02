const Cart = require('../models/cartModel');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const returnResponseFn = require('../utils/returnResponseHandler');

// get cart meals
exports.getCartMeals = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const [cart] = await Cart.aggregate([
    { $match: { userId: userId } },
    {
      $lookup: {
        from: 'meals',
        localField: 'meals',
        foreignField: '_id',
        as: 'meals',
      },
    },
  ]);

  // cart.meals = undefined;
  cart.totalPrice = cart.meals.reduce((prev, curr) => prev + curr.price, 0);

  // const [cart] = await Cart.find({ userId }).select('-__v');
  if (!cart) next(new AppError('Cart items not found', 404));
  returnResponseFn(cart, 201, res);
});

// edit cart
exports.updateCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const meals = req.body.meals.map((el) => new mongoose.Types.ObjectId(el));
  const totalPrice = req.body.totalPrice;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { meals, totalPrice } },
    { upsert: true, returnDocument: 'after' }
  ).select('-__v');

  console.log(cart);
  if (!cart) {
    return next(new AppError('No cart has been updated'));
  }

  returnResponseFn(cart, 200, res);
});

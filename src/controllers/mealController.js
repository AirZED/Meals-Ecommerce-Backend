const Meal = require('../models/mealModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const returnResponseFn = require('../utils/returnResponseHandler')

// all new meal
exports.addMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.create(req.body);

  returnResponseFn(meal, 201, res);
});

// get all meals
exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.find({});

  if (!meals) {
    return next(new AppError('Meals not found', 404));
  }

  returnResponseFn(meals, 200, res);
});

// get single meal
exports.getSingleMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const fetchedMeal = await Meal.findById(id);

  if (!fetchedMeal) {
    return next(new AppError('Meal is not available', 404));
  }

  returnResponseFn(fetchedMeal, 201, res);
});

// delete single meal
exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Meal.findByIdAndDelete(id);

  returnResponseFn(null, 204, res);
});

// update single meal
exports.updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  const updatedMeal = await Meal.findByIdAndUpdate(
    id,
    { $set: update },
    { returnDocument: 'after' }
  );

  returnResponseFn(updatedMeal, 201, res);
});

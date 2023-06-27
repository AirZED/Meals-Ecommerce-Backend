const Meal = require('../models/mealModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addMeal = catchAsync(async (req, res, next) => {
  await Meal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.find();

  if (!meals) {
    return next(new AppError('Meals not found', 404));
  }

  res.status(200).json({
    status: 'success',
    length: meals.length,
    data: {
      meals,
    },
  });
});

exports.getSingleMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const fetchedMeal = await Meal.findById(id);

  if (!fetchedMeal) {
    return next(new AppError('Meal is not available', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      meal: fetchedMeal,
    },
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Meal.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  const updatedMeal = await Meal.findByIdAndUpdate(id, update);
});

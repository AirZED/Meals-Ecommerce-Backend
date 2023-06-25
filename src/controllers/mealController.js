const { response } = require('../app');
const Meal = require('../models/mealModel');

exports.getAllMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find();

    res.status(200).json({
      status: 'success',
      data: {
        meals,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: 'meals not found',
    });
  }
};

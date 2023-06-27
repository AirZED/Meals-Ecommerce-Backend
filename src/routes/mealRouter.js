const express = require('express');
const Router = express.Router();

// importing controller
const mealController = require('./../controllers/MealController');

Router.route('/').get(mealController.getAllMeals).post(mealController.addMeal);

Router.route('/:id')
  .get(mealController.getSingleMeal)
  .delete(mealController.deleteMeal);

module.exports = Router;

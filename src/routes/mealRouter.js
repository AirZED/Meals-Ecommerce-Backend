const express = require('express');
const Router = express.Router();

// importing controller
const mealController = require('./../controllers/MealController');

Router.route('/').get(mealController.getAllMeals);

module.exports = Router;

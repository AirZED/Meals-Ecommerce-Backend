const dotenv = require('dotenv');
const Meal = require('../models/mealModel');
const fs = require('fs');
const db = require('../db');

dotenv.config({
  path: `${__dirname}/../../config.env`,
});

const meals = fs.readFileSync('./meals.json');

const fetchMeals = async () => {
  db();
  console.log('entered function');
  try {
    await Meal.create(JSON.parse(meals));
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === '--fetch') {
  fetchMeals();
}

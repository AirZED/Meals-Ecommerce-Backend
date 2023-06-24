const fs = require('fs');


const Meal = require('./../models/MealModel');

const { fetch } = require('popsicle');

const fetchMeals = async () => {
  try {
    // await dbConnect();
    const response = await fetch(
      'https://react-shopping-app-9b16c-default-rtdb.firebaseio.com/DUMMY_MEALS.json'
    );

    if (!response.ok) {
      throw new Error('THis was an error fetching meals');
    }

    const data = await response.text();

    const stringifiedData = JSON.parse(data);

    const createdMeals = await Meal.create(stringifiedData);

    fs.writeFile(`./meals.json`, JSON.stringify(stringifiedData), (err) => {
      if (err) {
        console.log('The write to file did not work');
        process.exit();
      }

      console.log('Successful');
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === '--fetch') {
  fetchMeals();
}

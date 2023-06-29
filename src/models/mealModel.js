const mongoose = require('mongoose');

const validator = require('validator');

const MealSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Meal must have a name'] },
    price: {
      type: Number,
      required: [true, 'Meal must have a price'],
    },
    createdAt: { type: Date, value: Date.now() },
    description: String,
    rating: { type: Number, default: 4.5 },
    available: { type: Boolean, dafault: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;

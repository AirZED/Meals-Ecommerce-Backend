const mongoose = require('mongoose');

const validator = require('validator');

const MealSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Meal must have a name'] },
    amount: {
      type: Number,
      required: [true, 'Meal must have an ammount'],
    },
    price: {
      type: Number,
      required: [true, 'Meal must have a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Meal must have a quantity'],
    },
    createdAt: Date,
    description: String,
    rating: { type: Number, default: 4.5 },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Discount price must be lower than original price',
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;

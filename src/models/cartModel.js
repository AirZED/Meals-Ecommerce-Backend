const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: String,
    totalPrice: Number,
    meals: { type: Array, default: [] },
    updatedAt: { type: Date, default: Date.now() },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;

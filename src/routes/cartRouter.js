const express = require('express');
const Router = express.Router();

const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

Router.route('/')
  .get(authController.protectSensitiveRoute, cartController.getCartMeals)
  .put(authController.protectSensitiveRoute, cartController.updateCart);

module.exports = Router;

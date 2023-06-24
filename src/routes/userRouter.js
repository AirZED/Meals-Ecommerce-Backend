const express = require('express');
const Router = express.Router();

// importing controller
const authController = require(`./../controllers/authController`);
const userController = require('./../controllers/userController');

Router.route('/signup').post(authController.signup);
Router.route('/login').post(authController.login);

Router.route('/').get(userController.getAllUsers);

module.exports = Router;

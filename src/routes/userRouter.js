const express = require('express');
const Router = express.Router();

// importing controller
const userController = require(`./../controllers/userController`);

Router.route('/').get(userController.signup);

module.exports = Router;

const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: 'meals not found',
    });
  }
};

exports.addMeal = async (req, res, next) => {};

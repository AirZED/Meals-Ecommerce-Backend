const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// function to sign token
const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const createdUser = await User.create({
    password: req.body.password,
    email: req.body.email,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (!createdUser) {
    return next(new AppError('Error signing up', 500));
  }

  // hash and return token with jwt
  const token = signToken(createdUser._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: createdUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return next(new AppError('Enter valid email or password', 400));
  }
  // check if user email exist
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('User does not exist, signup', 404));
  }

  // unhash password and be sure it matches
  if (!user || !user.confirmPassword(password, user.password)) {
    return next(new AppError('Wrong email or password', 400));
  }
  // sign a jwt
  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.protectSensitiveRoute = catchAsync(async (req, res, next) => {
  // get the token and check if its exist
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) next(new AppError('Please login to continue', 404));

  // verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

  // checking if user was deleted after token was created
  const confirmedUser = await User.findOne({ _id: decoded.id });

  if (!confirmedUser) {
    return next(new AppError('Invalid request, user has been deleted', 400));
  }

  // checking if user password was changed after req token was assigned
  const isPasswordChanged = confirmedUser.checkPasswordChange(decoded.iat);

  if (isPasswordChanged) {
    return next(
      new AppError(
        'Cannot perform request, password was changed amidst operation',
        400
      )
    );
  }
  req.user = confirmedUser;
  next();
});

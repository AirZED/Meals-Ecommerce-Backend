const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

// function to sign token
const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const createdUser = await User.create({
      password: req.body.password,
      email: req.body.email,
      passwordConfirm: req.body.passwordConfirm,
    });

    // hash and return token with jwt
    const token = signToken(createdUser._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: createdUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'This error happened suring startup',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new Error('Enter valid email or password');
    }
    // check if user email exist
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('User does not exist, signup');
    }

    // unhash password and be sure it matches
    if (!user || !user.confirmPassword(password, user.password)) {
      throw new Error('Wrong email or password');
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Error happened during login',
    });
  }
};

exports.protectSensitiveRoute = async (req, res, next) => {
  // get the token and check if its exist
  // verification of the token
  // checking if user was deleted after token was created
  // checking if user password was changed after reg token was assigned
};

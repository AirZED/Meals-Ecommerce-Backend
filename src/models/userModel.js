const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'User must have an Email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'User must input a passwordConfirm'],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// HASH PASSWORD
UserSchema.pre('save', async function (next) {
  //checks if there is no modification on password, hence does not run
  if (this.isModified('password')) next();

  // hash the password
  this.password = bcrypt.hashSync(this.password, 12);

  // make the passwordConfirm not have a value
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.confirmPassword = function (userPassword, dbPassword) {
  const isPassword = bcrypt.compareSync(userPassword, dbPassword);
  return isPassword;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

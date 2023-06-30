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
    createdAt: { type: Date, default: Date.now() },
    passwordChangedAt: Date,
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

// checkes if password is changed to update passwordChangeAt time
UserSchema.pre('save', async function (next) {
  // returns, and leave the middleware if the document is just created or the password is not changed
  if (!this.isModified('password') || this.isNew) return next();

  // if the password is changed, it sets the passwordchangeAt to this time
  this.passwordChangedAt = Date.now() - 3000;
  next();
});

// funciton to confirm password
UserSchema.methods.confirmPassword = function (userPassword, dbPassword) {
  const isPassword = bcrypt.compareSync(userPassword, dbPassword);
  return isPassword;
};

// function to check if password was changed during when jwt was sent
UserSchema.methods.checkPasswordChange = function (JWTExpireTime) {
  // converts passwordChangeTime to integer and reduces it to milliseconds
  if (this.passwordChangedAt) {
    const passwardChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwardChangeTime > JWTExpireTime;
  }
  return false;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

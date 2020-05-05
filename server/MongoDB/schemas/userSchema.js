const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    validate: {
      validator: (firstname) => firstname.length < 12,
      message: "The firstname must be up to 11 characters",
    },
  },
  lastname: {
    type: String,
    required: true,
    validate: {
      validator: (lastname) => lastname.length < 12,
      message: "The lastname must be up to 11 characters",
    },
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (age) => age < 120 && age > 0,
      message: "The age must be up to 120 years and positive number",
    },
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: (country) => country !== null && country !== "",
      message: "Country cant be empty",
    },
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: (username) => username.length < 31,
      message: "The username must be up to 30 characters",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => password.length < 201,
      message: "The password must be up to 200 characters",
    },
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

module.exports = userSchema;

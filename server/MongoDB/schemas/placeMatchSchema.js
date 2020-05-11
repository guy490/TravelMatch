const mongoose = require("mongoose");

let attributesSchema = new mongoose.Schema({
  country: {
    type: String,
    validate: {
      validator: (country) => country !== null,
      message: "The country cant be null",
    },
  },
  fromAge: {
    type: Number,
    validate: {
      validator: (age) => (age <= 120 && age >= 16) || age === 0,
      message: "The age must be between 16 to 120",
    },
  },
  toAge: {
    type: Number,
    validate: {
      validator: (age) => (age <= 120 && age >= 16) || age === 0,
      message: "The age must be between 16 to 120",
    },
  },
  gender: {
    type: String,
    validate: {
      validator: (gender) => gender !== null,
      message: "The gender cant be null",
    },
  },
  date: {
    type: Date,
  },
});

attributesSchema.pre("validate", function (next) {
  if (this.fromAge > this.toAge) {
    next(new Error("'From' age must be smaller then 'To' age"));
  } else {
    next();
  }
});

let placeMatchSchema = new mongoose.Schema({
  placeID: {
    type: String,
    required: true,
    validate: {
      validator: (placeID) => placeID.length < 51,
      message: "The placeID must be up to 50 characters",
    },
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    validate: {
      validator: (latitude) => latitude !== null,
      message: "The latitude cant be null",
    },
  },
  longitude: {
    type: Number,
    required: true,
    validate: {
      validator: (longitude) => longitude !== null,
      message: "The longitude cant be null",
    },
  },
  attributes: attributesSchema,
});

module.exports = placeMatchSchema;

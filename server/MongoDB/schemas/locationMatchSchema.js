const mongoose = require("mongoose");

/* ############################ */
let locationSchema = new mongoose.Schema({
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
});
/* ############################ */

/* ############################ */
let locationMatchSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    validate: {
      validator: (userID) => userID.length < 51,
      message: "The userID must be up to 50 characters",
    },
  },
  source: locationSchema,
  destination: locationSchema,
});
/* ############################ */

module.exports = locationMatchSchema;

const mongoose = require("mongoose");

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
    type: String,
    required: true,
    validate: {
      validator: (userID) => userID.length < 51,
      message: "The userID must be up to 50 characters",
    },
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
});

module.exports = placeMatchSchema;

const mongoose = require("mongoose");

/* ############################ */
let locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
    validate: {
      validator: (lat) => lat !== null,
      message: "The latitude cant be null",
    },
  },
  lng: {
    type: Number,
    required: true,
    validate: {
      validator: (lng) => lng !== null,
      message: "The longitude cant be null",
    },
  },
});
/* ############################ */

/* ############################ */
let locationMatchSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  source: locationSchema,
  destination: locationSchema,
});
/* ############################ */

module.exports = locationMatchSchema;

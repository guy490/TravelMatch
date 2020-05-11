if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { calcMatchByRadius } = require("../utilities");
const userSchema = require("./schemas/userSchema");
const placeMatchSchema = require("./schemas/placeMatchSchema");
const locationMatchSchema = require("./schemas/locationMatchSchema");

const usersModel = mongoose.model("users", userSchema);
const placeMatchModel = mongoose.model("match", placeMatchSchema);
const locationMatchModel = mongoose.model("locationMatch", locationMatchSchema);

const mongoInsertUser = async (userCredentials) => {
  var user_instance = new usersModel(userCredentials);
  return usersModel
    .findOne({ username: userCredentials.username })
    .then((res) => {
      if (!res) {
        return user_instance.save();
      }
      const error = new Error("User already exist");
      error.name = "UserAlreadyExistError";
      throw error;
    });
};

const mongoLoginUser = async (userCredentials) => {
  return usersModel
    .findOne({ username: userCredentials.username })
    .then(async (user) => {
      if (user) {
        if (await bcrypt.compare(userCredentials.password, user.password)) {
          delete user.password;
          return user;
        }
      }
      const error = new Error("User or Password are incorrect");
      error.name = "UserLoginError";
      throw error;
    });
};

const mongoFindUserByID = async (userID) => {
  return usersModel
    .findOne({ _id: userID })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

const mongoUpdateUserByID = async (userCredentials) => {
  return usersModel
    .findOne({ _id: userCredentials.userID })
    .then(async (user) => {
      Object.assign(user, userCredentials);
      return user.save();
    })
    .catch((err) => {
      throw err;
    });
};

const mongoInsertMatch = async (userMatchData) => {
  let match_instance;
  let queryParameters = {};
  let matchModel = null;

  if (userMatchData.placeID !== undefined) {
    matchModel = placeMatchModel;
    queryParameters = { placeID: userMatchData.placeID };
  } else {
    matchModel = locationMatchModel;
  }

  match_instance = new matchModel(userMatchData);

  return matchModel
    .findOne({ userID: userMatchData.userID, ...queryParameters })
    .then((match) => {
      if (!match) {
        return match_instance.save();
      } else {
        Object.assign(match, userMatchData);
        return match.save();
      }
    })
    .catch((err) => {
      throw err;
    });
};

const mongoFindMatchByPlace = async (placeID, { ...filters }) => {
  return await placeMatchModel
    .find({
      placeID,
      "attributes.date": filters.date,
    })
    .then((matches) => matches)
    .catch((err) => {
      throw err;
    });
};

const mongoFindMatchByLocation = async (source, destination) => {
  return await locationMatchModel
    .find()
    .then((allmatches) => {
      return allmatches.filter((locationMatch) => {
        const user1 = { source, destination };
        const user2 = {
          source: locationMatch.source,
          destination: locationMatch.destination,
        };
        return calcMatchByRadius(user1, user2);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const mongoFindMyMatchesByUserID = async (userID) => {
  let myMatches = {};
  myMatches.places = await placeMatchModel
    .find({ userID })
    .then((matches) => matches)
    .catch((err) => {
      throw err;
    });
  myMatches.taxies = await locationMatchModel
    .find({ userID })
    .then((matches) => matches)
    .catch((err) => {
      throw err;
    });
  return myMatches;
};

const mongoDeleteMatch = async (userMatchData) => {
  let queryParameters = {};
  let matchModel = null;

  if (userMatchData.placeID !== undefined) {
    matchModel = placeMatchModel;
    queryParameters = { placeID: userMatchData.placeID };
  } else {
    matchModel = locationMatchModel;
  }

  return await matchModel
    .deleteOne({
      userID: userMatchData.userID,
      ...queryParameters,
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  mongoInsertUser,
  mongoLoginUser,
  mongoInsertMatch,
  mongoFindUserByID,
  mongoFindMyMatchesByUserID,
  mongoDeleteMatch,
  mongoUpdateUserByID,
  mongoFindMatchByPlace,
  mongoFindMatchByLocation,
};

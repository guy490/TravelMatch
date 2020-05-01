const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
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

// const mongoInsertMatch = (userMatchData) => {

//   var match_instance = new placeMatchModel(userMatchData);
//   var match_location_instance = new locationMatchModel(userMatchData);
//   let model = null;
//   if (userMatchData.placeID !== undefined) {
//     model = "placeMatch";
//     queryParameters = { placeID: userMatchData.placeID };
//   } else {
//     collectionName = "locationMatch";
//   }
//   return matchModel
//     .findOne({ username: userCredentials.username })
//     .then((res) => {
//       if (!res) {
//         return user_instance.save();
//       }
//       const error = new Error("User already exist");
//       error.name = "UserAlreadyExistError";
//       throw error;
//     });
//   return await MongoClient.connect(url, { useUnifiedTopology: true }).then(
//     async (client) => {
//       const db = client.db(dbName);
//       let collectionName;
//       let queryParameters = {};
//       if (userMatchData.placeID !== undefined) {
//         collectionName = "placeMatch";
//         queryParameters = { placeID: userMatchData.placeID };
//       } else {
//         collectionName = "locationMatch";
//       }
//       return await db
//         .collection(collectionName)
//         .updateOne(
//           { userID: userMatchData.userID, ...queryParameters },
//           { $set: { ...userMatchData } },
//           { upsert: true }
//         )
//         .then((res) => res)
//         .catch((err) => {
//           throw err;
//         })
//         .finally(() => client.close());
//     }
//   );
// };
// const mongoFindMatch = async (placeID) => {
//   return await MongoClient.connect(url, { useUnifiedTopology: true })
//     .then(async (client) => {
//       const db = client.db(dbName);
//       return await db.collection("placeMatch").find({ placeID }).toArray();
//     })
//     .catch((err) => err);
// };

// const mongoFindMatchByLocation = async (source, destination) => {
//   return await MongoClient.connect(url, { useUnifiedTopology: true })
//     .then(async (client) => {
//       const db = client.db(dbName);
//       const placeMatches = await db
//         .collection("locationMatch")
//         .find()
//         .toArray();
//       return placeMatches.filter((placeMatch) => {
//         const user1 = { source, destination };
//         const user2 = {
//           source: placeMatch.source,
//           destination: placeMatch.destination,
//         };
//         return calcMatchByRadius(user1, user2);
//       });
//     })
//     .catch((err) => err);
// };

// const mongoFindMyMatchesByUserID = async (userID) => {
//   return await MongoClient.connect(url, { useUnifiedTopology: true })
//     .then(async (client) => {
//       const db = client.db(dbName);
//       return await db.collection("placeMatch").find({ userID }).toArray();
//     })
//     .catch((err) => err);
// };

// const mongoDeleteMatch = async (userMatchData) => {
//   return await MongoClient.connect(url, { useUnifiedTopology: true })
//     .then(async (client) => {
//       const db = client.db(dbName);
//       return await db
//         .collection("placeMatch")
//         .deleteOne({
//           userID: userMatchData.userID,
//           placeID: userMatchData.placeID,
//         })
//         .then((result) => result)
//         .catch((err) => {
//           throw err;
//         })
//         .finally(() => client.close());
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

module.exports = {
  mongoInsertUser,
  mongoLoginUser,
  // mongoInsertMatch,
  // mongoFindMatch,
  mongoFindUserByID,
  // mongoFindMyMatchesByUserID,
  // mongoDeleteMatch,
  mongoUpdateUserByID,
  // mongoFindMatchByLocation,
};

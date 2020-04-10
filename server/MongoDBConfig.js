const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://" +
  process.env.TravelMatchMongoUser +
  ":" +
  process.env.TravelMatchMongoPassword +
  "@cluster0-bcqmj.mongodb.net/";
const dbName = "TravelMatch";

const mongoInsertUser = (userCredentials, ressponse) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const db = client.db(dbName);

    db.collection("users").insertOne(userCredentials, function (err, result) {
      if (result !== null) {
        ressponse.send("Register completed!");
      } else {
        ressponse.status("404").send("Register error");
      }
      client.close();
    });
  });
};

const mongoFindUserByUserName = async (username) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("users")
        .findOne({ username })
        .then((res) => res)
        .catch((err) => null);
    })
    .catch((err) => null);
};

const mongoFindUserByID = async (userID) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("users")
        .findOne({ _id: mongodb.ObjectID(userID) })
        .then((res) => res)
        .catch((err) => err);
    })
    .catch((err) => err);
};

const mongoInsertMatch = (userMatchData, ressponse) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const db = client.db(dbName);

    db.collection("match").update(
      { userID: userMatchData.userID, placeID: userMatchData.placeID },
      { ...userMatchData },
      { upsert: true },
      function (err, result) {
        if (result !== null) {
          ressponse.send("The match insert completed!");
        } else {
          ressponse.status("404").send(err);
        }
        client.close();
      }
    );
  });
};
const mongoFindMatch = async (placeID) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db.collection("match").find({ placeID }).toArray();
    })
    .catch((err) => err);
};

module.exports = {
  mongoInsertUser,
  mongoFindUserByUserName,
  mongoInsertMatch,
  mongoFindMatch,
  mongoFindUserByID,
};

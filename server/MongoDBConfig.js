const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://" +
  process.env.TravelMatchMongoUser +
  ":" +
  process.env.TravelMatchMongoPassword +
  "@cluster0-bcqmj.mongodb.net/";
const dbName = "TravelMatch";

const mongoInsertUser = async (userCredentials) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);

      return await db
        .collection("users")
        .insertOne(userCredentials)
        .then((result) => result)
        .catch((err) => {
          throw err;
        })
        .finally(() => client.close());
    })
    .catch((err) => {
      throw err;
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

const mongoUpdateUserByID = async (userCredentials) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("users")
        .updateOne(
          { _id: mongodb.ObjectID(userCredentials.userID) },
          { $set: { ...userCredentials } }
        )
        .then((res) => res)
        .catch((err) => {
          throw err;
        })
        .finally(() => client.close());
    })
    .catch((err) => {
      throw err;
    });
};

const mongoInsertMatch = async (userMatchData) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true }).then(
    async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("match")
        .updateOne(
          { userID: userMatchData.userID, placeID: userMatchData.placeID },
          { $set: { ...userMatchData } },
          { upsert: true }
        )
        .then((res) => res)
        .catch((err) => {
          throw err;
        })
        .finally(() => client.close());
    }
  );
};
const mongoFindMatch = async (placeID) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db.collection("match").find({ placeID }).toArray();
    })
    .catch((err) => err);
};

const mongoFindMyMatchesByUserID = async (userID) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db.collection("match").find({ userID }).toArray();
    })
    .catch((err) => err);
};

const mongoDeleteMatch = async (userMatchData) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("match")
        .deleteOne({
          userID: userMatchData.userID,
          placeID: userMatchData.placeID,
        })
        .then((result) => result)
        .catch((err) => {
          throw err;
        })
        .finally(() => client.close());
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  mongoInsertUser,
  mongoFindUserByUserName,
  mongoInsertMatch,
  mongoFindMatch,
  mongoFindUserByID,
  mongoFindMyMatchesByUserID,
  mongoDeleteMatch,
  mongoUpdateUserByID,
};

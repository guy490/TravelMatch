const mongodb = require("mongodb");

const { calcMatchByRadius } = require("./utilities");

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
      let collectionName;
      let queryParameters = {};
      if (userMatchData.placeID !== undefined) {
        collectionName = "placeMatch";
        queryParameters = { placeID: userMatchData.placeID };
      } else {
        collectionName = "locationMatch";
      }
      return await db
        .collection(collectionName)
        .updateOne(
          { userID: userMatchData.userID, ...queryParameters },
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
      return await db.collection("placeMatch").find({ placeID }).toArray();
    })
    .catch((err) => err);
};

const mongoFindMatchByLocation = async (source, destination) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      const placeMatches = await db
        .collection("locationMatch")
        .find()
        .toArray();
      return placeMatches.filter((placeMatch) => {
        const user1 = { source, destination };
        const user2 = {
          source: placeMatch.source,
          destination: placeMatch.destination,
        };
        return calcMatchByRadius(user1, user2);
      });
    })
    .catch((err) => err);
};

const mongoFindMyMatchesByUserID = async (userID) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db.collection("placeMatch").find({ userID }).toArray();
    })
    .catch((err) => err);
};

const mongoDeleteMatch = async (userMatchData) => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async (client) => {
      const db = client.db(dbName);
      return await db
        .collection("placeMatch")
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
  mongoFindMatchByLocation,
};

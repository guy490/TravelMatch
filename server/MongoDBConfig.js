const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://" +
  process.env.TravelMatchMongoUser +
  ":" +
  process.env.TravelMatchMongoPassword +
  "@cluster0-bcqmj.mongodb.net/";
const dbName = "TravelMatch";

const mongoInsert = (userCredentials, ressponse) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    const db = client.db(dbName);

    db.collection("users").insertOne(userCredentials, function(err, result) {
      if (result !== null) {
        ressponse.send("Register completed!");
      } else {
        ressponse.status("404").send("Register error");
      }
      client.close();
    });
  });
};

const mongoFind = async username => {
  return await MongoClient.connect(url, { useUnifiedTopology: true })
    .then(async client => {
      const db = client.db(dbName);
      return await db
        .collection("users")
        .findOne({ username })
        .then(res => res)
        .catch(err => null);
    })
    .catch(err => null);
};

module.exports = { mongoInsert, mongoFind };

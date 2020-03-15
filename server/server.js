const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const assert = require("assert");
const mongodb = require("mongodb");
const app = express();

const port = 3001;

console.log(process.env.TravelMatchAPIKey);
const API_KEY = process.env.TravelMatchAPIKey;
const PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PHOTOS_URL = "https://maps.googleapis.com/maps/api/place/photo";

const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://" +
  process.env.TravelMatchMongoUser +
  ":" +
  process.env.TravelMatchMongoPassword +
  "@cluster0-bcqmj.mongodb.net/";
const dbName = "TravelMatch";

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { latitude, longitude, type } = req.query;
  const places = await axios
    .get(PLACES_URL, {
      params: {
        location: `${latitude},${longitude}`,
        radius: "15000",
        type,
        rankby: "prominence",
        key: API_KEY
      }
    })
    .catch(err => {
      console.log(err);
    });

  res.send(places.data.results);
});

app.post("/register_request", async (req, res) => {
  const userCredentials = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("users").insertOne(userCredentials, function(err, result) {
      assert.equal(null, err);
      console.log("Item inserted");
      client.close();
      res.send("DB Updated");
    });
  });
});

app.post("/login_request", async (req, res) => {
  const userCredentials = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("users").findOne(userCredentials, function(err, result) {
      assert.equal(null, err);
      if (result !== null) {
        res.send("Login completed!");
      } else {
        res.status("404").send("Login error");
      }
      client.close();
    });
  });
});

app.get("/:photoReference", async (req, res) => {
  const photo = await axios
    .get(PHOTOS_URL, {
      params: {
        maxwidth: "400",
        maxheight: "400",
        photoreference: req.params.photoReference,
        key: API_KEY
      }
    })
    .catch(err => {
      console.log(err);
    });
  res.send(photo.request.res.responseUrl);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

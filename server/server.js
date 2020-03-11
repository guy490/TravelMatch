const express = require("express");
const axios = require("axios");
const mongodb = require("mongodb");
const app = express();

const port = 3001;

const API_KEY = "AIzaSyA6N00_LlCQHniVf7kXU6Xy67DOzqc646U";
const PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PHOTOS_URL = "https://maps.googleapis.com/maps/api/place/photo";

const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://TravelMatch:Aa123456@cluster0-bcqmj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

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

app.post("/register-request", async (req, res) => {
  console.log(req);
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(
  //     err,
  //     result
  //   ) {
  //     console.log("Inserted 3 documents into the collection");
  //   });
  //   client.close();
  // });
  res.send("DB updated");
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

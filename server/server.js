const express = require("express");
const axios = require("axios");
const app = express();

const port = 3001;

const API_KEY = "AIzaSyA6N00_LlCQHniVf7kXU6Xy67DOzqc646U";
const PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PHOTOS_URL = "https://maps.googleapis.com/maps/api/place/photo";

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

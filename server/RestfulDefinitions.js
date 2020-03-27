const { mongoInsert, mongoFind } = require("./MongoDBConfig");

module.exports = app => {
  const axios = require("axios");
  const bodyParser = require("body-parser");
  const bcrypt = require("bcrypt");

  const API_KEY = process.env.TravelMatchAPIKey;
  const PLACES_URL =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const PHOTOS_URL = "https://maps.googleapis.com/maps/api/place/photo";

  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = [
      "http://localhost:3000",
      "https://guy490.github.io"
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    const { latitude, longitude, type } = req.query;
    axios
      .get(PLACES_URL, {
        params: {
          location: `${latitude},${longitude}`,
          radius: "15000",
          type,
          rankby: "prominence",
          key: API_KEY
        }
      })
      .then(response => {
        res.send(response.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/register_request", async (req, res) => {
    const userCredentials = req.body;
    try {
      userCredentials.password = await bcrypt.hash(
        userCredentials.password,
        10
      );
    } catch {
      res.status("404").send("Encryption failed");
    }
    mongoInsert(userCredentials, res);
  });

  app.post("/login_request", async (req, res) => {
    const userCredentials = req.body;
    const user = await mongoFind(userCredentials.username);
    if (user == null) {
      res.status("404").send("Login Error");
      return;
    }
    try {
      if (await bcrypt.compare(userCredentials.password, user.password)) {
        delete user.password;
        res.send(user);
      } else {
        res.status("404").send("Login Error");
      }
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/:photoReference", (req, res) => {
    axios
      .get(PHOTOS_URL, {
        params: {
          maxwidth: "400",
          maxheight: "400",
          photoreference: req.params.photoReference,
          key: API_KEY
        }
      })
      .then(response => {
        res.send(response.request.res.responseUrl);
      })
      .catch(err => {
        res.send(
          "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
        );
      });
  });
};
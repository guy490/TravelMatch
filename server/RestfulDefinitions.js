const {
  mongoInsertUser,
  mongoLoginUser,
  mongoInsertMatch,
  mongoFindMatchByPlace,
  mongoFindUserByID,
  mongoFindMyMatchesByUserID,
  mongoDeleteMatch,
  mongoUpdateUserByID,
  mongoFindMatchByLocation,
} = require("./MongoDB/MongoDBManagement");

const { PLACES_URL, PLACE_DETAILS_URL, PHOTOS_URL } = require("./URLs");

module.exports = (app) => {
  const axios = require("axios");
  const bodyParser = require("body-parser");

  const API_KEY = process.env.TravelMatchAPIKey;

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = [
      "http://localhost:3000",
      "https://guy490.github.io",
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

  app.get("/get_places", (req, res) => {
    const { latitude, longitude, type } = req.query;
    axios
      .get(PLACES_URL, {
        params: {
          location: `${latitude},${longitude}`,
          radius: "15000",
          type,
          rankby: "prominence",
          key: API_KEY,
        },
      })
      .then((response) => {
        res.send(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post("/register_request", (req, res) => {
    const userCredentials = req.body;
    mongoInsertUser(userCredentials)
      .then(() => {
        res.send("User entered successfully!");
      })
      .catch((err) => {
        if (
          err.name === "ValidationError" ||
          err.name === "UserAlreadyExistError"
        ) {
          res.status("404").send(err.message);
        } else {
          console.log(err);
          res.status("500").send("Internal Server Error");
        }
      });
  });

  app.post("/login_request", (req, res) => {
    const userCredentials = req.body;
    mongoLoginUser(userCredentials)
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === "UserLoginError") {
          res.status("404").send(err.message);
        } else {
          console.log(err);
          res.status("500").send("Internal Server Error");
        }
      });
  });

  app.post("/update_request", async (req, res) => {
    const userCredentials = req.body;
    mongoUpdateUserByID(userCredentials)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status("500").send(err.message);
      });
  });

  app.get("/get_matches", async (req, res) => {
    const matchDetails = req.query;
    let matchList;
    if (matchDetails.placeID !== undefined) {
      matchList = await mongoFindMatchByPlace(matchDetails.placeID);
    } else {
      matchList = await mongoFindMatchByLocation(
        { lat: matchDetails.srcLat, lng: matchDetails.srcLng },
        { lat: matchDetails.dstLat, lng: matchDetails.dstLng }
      );
    }
    let userMatchingList = matchList.map(async (match) => {
      const user = await mongoFindUserByID(match.userID);
      delete user["password"];
      return user;
    });
    userMatchingList = await Promise.all(userMatchingList);
    res.send(userMatchingList);
  });

  app.get("/get_my_matches", async (req, res) => {
    const matchDetails = req.query;
    const matchList = await mongoFindMyMatchesByUserID(matchDetails.userID);
    let userMatchingList = {};

    userMatchingList.placeList = matchList.places.map(async (match) => {
      return axios
        .get(PLACE_DETAILS_URL, {
          params: {
            key: API_KEY,
            fields: "name,photos,place_id",
            place_id: match.placeID,
          },
        })
        .then((response) => {
          return response.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    userMatchingList.placeList = await Promise.all(userMatchingList.placeList);
    userMatchingList.taxiRequests = matchList.taxies;

    res.send(userMatchingList);
  });

  app.post("/delete_match_request", async (req, res) => {
    const matchDetails = req.body;
    mongoDeleteMatch(matchDetails)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status("404").send(err);
      });
  });

  app.get("/get_profile", async (req, res) => {
    const user = req.query;
    let userProfile = await mongoFindUserByID(user.userID);
    delete userProfile["password"];
    res.send(userProfile);
  });

  app.get("/:photoReference", (req, res) => {
    axios
      .get(PHOTOS_URL, {
        params: {
          maxwidth: "400",
          maxheight: "400",
          photoreference: req.params.photoReference,
          key: API_KEY,
        },
      })
      .then((response) => {
        res.send(response.request.res.responseUrl);
      })
      .catch((err) => {
        res.send(
          "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
        );
      });
  });

  app.post("/match_request", async (req, res) => {
    const matchDetails = req.body;
    mongoInsertMatch(matchDetails)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status("404").send("Internal Server Error");
      });
  });
};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// RESTFUL
const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("./RestfulDefinitions")(app);

const mongoDB =
  "mongodb+srv://" +
  process.env.TravelMatchMongoUser +
  ":" +
  process.env.TravelMatchMongoPassword +
  "@" +
  process.env.TravelMatchMongoURL;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 3001;
    let server = app.listen(port, () =>
      console.log(`TravelMatch app listening on port ${port}!`)
    );

    // WEB_SOCKET
    const io = require("socket.io")(server);
    require("./WebSocketDefinitions")(io);
  })
  .catch((err) => console.log(err));

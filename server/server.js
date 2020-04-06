if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// RESTFUL
const port = process.env.PORT || 3001;
const express = require("express");
const app = express();

require("./RestfulDefinitions")(app);

let server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// WEB_SOCKET

const io = require("socket.io")(server);

require("./WebSocketDefinitions")(io);

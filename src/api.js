import axios from "axios";
import openSocket from "socket.io-client";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log(process.env);
const server = axios.create({
  baseURL:
    process.env.REACT_APP_LOCALHOST_RESTFUL ||
    "https://travel-match-project.herokuapp.com/",
});

const socket = openSocket(
  process.env.REACT_APP_LOCALHOST_WEBSOCKET ||
    "wss://travel-match-project.herokuapp.com/"
);

export { server, socket };

import axios from "axios";
import openSocket from "socket.io-client";

// const server = axios.create({
//   baseURL: "http://localhost:3001"
// });
const server = axios.create({
  baseURL: "https://travel-match-project.herokuapp.com/"
});

// const socket = openSocket("ws://localhost:3001");
const socket = openSocket("wss://travel-match-project.herokuapp.com/");

export { server, socket };

import axios from "axios";
import openSocket from "socket.io-client";

const server = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST_RESTFUL,
});

const socket = openSocket(process.env.REACT_APP_LOCALHOST_WEBSOCKET);

export { server, socket };

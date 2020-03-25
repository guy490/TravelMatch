import axios from "axios";
import openSocket from "socket.io-client";

const server = axios.create({
  baseURL: "http://localhost:3001"
});

const socket = openSocket("ws://localhost:3001");

export { server, socket };

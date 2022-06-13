import app from "./app";
import config from "./config";
import database from "./database/connect";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { libraries } from "./lib/loadLibs";

// Connect mongo
database();

global.socketConnections = new Map<string, Socket>();
global.globalConfig = config;
global.libs = libraries;

const port = 5001;

const server = createServer(app);
const io = (global.io = new Server(server));

//not listening to the connections only emitting to it.
io.on("connection", (socket) => {
  console.log("connection!");

  global.socketConnections.set(socket.id, socket);
});

server.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

import { Server, Socket } from "socket.io";
import config from "../config";
import { libraries } from "../lib/loadLibs";

declare global {
  var io: Server;
  var globalConfig: typeof config;
  var socketConnections: Map<string, Socket>;
  var libs: typeof libraries;
}

export {};

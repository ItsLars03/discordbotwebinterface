import DiscordClient from "../client/client";
import Config from "../config";
import cache from "../cache";
import { Socket } from "socket.io-client";
import { StateManager } from ".";
import loadLibs from "../libs/loadLibs";

declare global {
  var globalConfig: typeof Config;
  var client: DiscordClient;
  var globalCache: typeof cache;
  var socket: Socket;
  var ws: StateManager;
  var libs: typeof loadLibs;
}

export {};

import { Client, Intents } from "discord.js";
import DiscordClient from "./client/client";
import * as fs from "node:fs";
import { io } from "socket.io-client";
import { registerCommands, registerEvents } from "./utils/registry";
import config from "./config";
import cache from "./cache";
import ws from "./utils/stateManager";
import loadLibs from "./libs/loadLibs";

let token: string = fs.readFileSync(".token", { encoding: "utf8" }) as string;
global.globalConfig = config;
global.globalCache = cache;
global.socket = io("http://127.0.0.1:5001");
global.ws = ws;
global.libs = loadLibs;

const client: DiscordClient = (global.client = new DiscordClient(
  {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  },
  config
));

(async () => {
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(token);
  console.log("DONE LOADING.");
})();

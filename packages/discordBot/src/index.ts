import { Client, Intents } from "discord.js";
import DiscordClient from "./client/client";
import * as fs from "node:fs";
import { registerCommands, registerEvents } from "./utils/registry";
import config from "./config";

let token: string = fs.readFileSync(".token", { encoding: "utf8" }) as string;
global.globalConfig = config;

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
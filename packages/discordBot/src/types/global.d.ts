import DiscordClient from "../client/client";
import Config from "../config";

declare global {
  var globalConfig: typeof Config;
  var client: DiscordClient;
}

export {};

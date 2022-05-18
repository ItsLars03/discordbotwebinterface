import DiscordClient from "../client/client";

declare global {
  var globalConfig: any;
  var client: DiscordClient;
}

export {};

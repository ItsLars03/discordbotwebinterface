import { Guild } from "discord.js";
import DiscordClient from "../../client/client";
import BaseDiscordEvent from "../../utils/structures/BaseDiscordEvent";
import axios, { AxiosError } from "axios";

export default class ReadyEvent extends BaseDiscordEvent {
  constructor() {
    super("ready");
  }

  init = () => {
    socket.on("settings-update", (id: string, data: any) => {
      globalCache.guildData.set(id, data);
    });
  };

  async run(client: DiscordClient) {
    try {
      const guilds = await client.guilds.fetch();
      guilds.forEach(async (guild) => {
        try {
          console.log(
            "uri",
            globalConfig.api.host + "/api/v1/settings/" + guild.id
          );
          const { data } = await libs.apiHelper.get(
            globalConfig.api.host + "/api/v1/settings/" + guild.id
          );
          globalCache.guildData.set(guild.id, data);
          console.log("got guild data for guildId = " + guild.id, data.prefix);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.status == 404) {
            //no guild settings...
            console.log(
              "No guilds settings for guildId=" + guild.id,
              "creating guild settings..."
            );
            try {
              const { data } = await libs.apiHelper.post(
                globalConfig.api.host + "/api/v1/settings/create/" + guild.id
              );
              console.log("guild data created for guildId = " + guild.id, data);
            } catch (error) {}
            return;
          }
          console.error("error getting data from guildId=" + guild.id, error);
        }
      });
    } catch (error) {}
  }
}

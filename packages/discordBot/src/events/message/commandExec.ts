import BaseDiscordEvent from "../../utils/structures/BaseDiscordEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseDiscordEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    if (!message.guild || !message.guildId) return;
    if (message.author.bot) return;
    const prefix = globalCache.guildData.get(message.guildId)?.prefix;
    if (prefix == null) {
      console.error(
        "Not executing command because there is no guild data... GuildId=",
        message.guildId
      );
      return;
    }

    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName.toLowerCase());
      if (command) {
        command.run(client, message, cmdArgs);
      } else {
        //give exp
        ws.emit("level-system:giveExp", message);
      }
    }
  }
}

import BaseDiscordEvent from "../../utils/structures/BaseDiscordEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseDiscordEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (
      message.content.startsWith(globalConfig.bot.prefix) ||
      message.content.startsWith("/")
    ) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName.toLowerCase());
      if (command) {
        console.log("Executing command", command.getName());
        command.run(client, message, cmdArgs);
      }
    }
  }
}

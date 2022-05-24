import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

export default class TestCommand extends BaseCommand {
  constructor() {
    super("test", "test", {});
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.reply("test...");
  }
}

import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import { CommandOptions } from "../../types";

export default abstract class BaseCommand {
  constructor(
    private name: string,
    private category: string,
    private options: CommandOptions
  ) {}

  getName(): string {
    return this.name;
  }
  getCategory(): string {
    return this.category;
  }
  getOptions(): CommandOptions {
    return this.options;
  }

  init?: () => Promise<void> | void;
  onReady?: (client: DiscordClient) => Promise<void> | void;
  abstract run(
    client: DiscordClient,
    message: Message,
    args: Array<string> | null
  ): Promise<any> | void;
}

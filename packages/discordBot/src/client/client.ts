import { Client, Collection, ClientOptions } from "discord.js";
import BaseCommand from "../utils/structures/BaseCommand";
import BaseDiscordEvent from "../utils/structures/BaseDiscordEvent";
import Config from "../config";

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events: BaseDiscordEvent[] = [];
  private _customEvents: BaseDiscordEvent[] = [];
  private _prefix: string;
  static guilds: any;

  constructor(options: ClientOptions, config: typeof Config) {
    super(options);
    console.log("config", config);
    this._prefix = config.bot.prefix;
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }
  get events(): BaseDiscordEvent[] {
    return this._events;
  }
  get customEvents(): BaseDiscordEvent[] {
    return this._customEvents;
  }

  get prefix(): string {
    return this._prefix;
  }
  set prefix(prefix: string) {
    this._prefix = prefix;
  }
}

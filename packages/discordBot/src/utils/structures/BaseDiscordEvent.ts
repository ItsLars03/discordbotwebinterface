import DiscordClient from "../../client/client";
import { ClientEvents } from "discord.js";
import { discordEvents, EventOptions, WsEvents } from "../../types";
import BaseEvent from "./BaseEvent";

export default abstract class BaseDiscordEvent extends BaseEvent {
  constructor(name: WsEvents | discordEvents, options: EventOptions = {}) {
    super(name, options);
  }

  init?: () => Promise<void> | void;
  onReady?: (client: DiscordClient) => Promise<void> | void;
}

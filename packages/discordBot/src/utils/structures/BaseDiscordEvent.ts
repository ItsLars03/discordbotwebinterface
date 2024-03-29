import DiscordClient from "../../client/client";
import { discordEvents, EventOptions } from "../../types";
import BaseEvent from "./BaseEvent";

export default abstract class BaseDiscordEvent extends BaseEvent {
  constructor(name: discordEvents, options: EventOptions = {}) {
    super(name, options);
  }

  init?: () => Promise<void> | void;
  onReady?: (client: DiscordClient) => Promise<void> | void;
}

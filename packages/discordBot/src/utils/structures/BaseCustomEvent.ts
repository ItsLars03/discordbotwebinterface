import DiscordClient from "../../client/client";
import { EventOptions } from "../../types";
import BaseEvent from "./BaseEvent";

export default abstract class BaseCustomEvent extends BaseEvent {
  constructor(name: string, options: EventOptions = {}) {
    super(name, options);
  }

  init?: () => Promise<void> | void;
  onReady?: (client: DiscordClient) => Promise<void> | void;
}

import DiscordClient from "../../client/client";
import { EventOptions } from "../../types";

export default abstract class BaseEvent {
  constructor(private name: string, private options: EventOptions) {}

  type = "Event";

  setType(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  getName(): string {
    return this.name;
  }
  getOptions(): EventOptions {
    return this.options;
  }

  abstract run(client: DiscordClient, ...args: any): void;
}

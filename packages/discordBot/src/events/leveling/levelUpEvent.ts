import DiscordClient from "../../client/client";
import BaseSocketEvent from "../../utils/structures/BaseSocketEvent";

export default class LevelUpEvent extends BaseSocketEvent {
  constructor() {
    super("level-system:levelup");
  }

  async run(client: DiscordClient, guildId: string, memberId: string) {
    //TODO
  }
}

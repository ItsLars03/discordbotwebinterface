import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCustomEvent from "../../utils/structures/BaseCustomEvent";

export default class CacheGiveExperienceEvent extends BaseCustomEvent {
  constructor() {
    super("level-system:giveExp");
  }

  async run(client: DiscordClient, message: Message) {
    //TODO validate & cache exp.

    if (
      !message.guild ||
      !message.guildId ||
      !message.member ||
      message.member.user.bot
    ) {
      return;
    }

    const guildCache =
      globalCache.trackedExpMessages.get(message.guildId) ??
      new Map<string, number>();
    const count = guildCache.get(message.author.id) ?? 0;
    guildCache.set(message.author.id, count + 1);
    globalCache.trackedExpMessages.set(message.guildId, guildCache);
  }
}

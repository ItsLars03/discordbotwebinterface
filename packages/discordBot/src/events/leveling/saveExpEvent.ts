import { Guild, GuildMember } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCustomEvent from "../../utils/structures/BaseCustomEvent";

export default class GiveExperienceEvent extends BaseCustomEvent {
  constructor() {
    super("level-system:saveExp");
  }

  intervalTime = 1000 * 5 * 60; // every 5 minutes

  init = () => {
    //kind of an invinity loop but little weird?
    setInterval(() => ws.emit("level-system:saveExp"), this.intervalTime);
  };

  async run(client: DiscordClient) {
    //TODO make api call to give exp
    // libs.apiHelper.post(globalConfig.api.host + `/api/v1/memberdata/update/add/${guild.id}/${member.id}`)
  }
}

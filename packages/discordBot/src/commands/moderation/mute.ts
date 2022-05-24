import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

export default class MuteCommand extends BaseCommand {
  constructor() {
    super("mute", "moderatoin", {});
  }

  muteRole: string = "978623128580276284";

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (args.length < 2) {
      message.reply("!mute <target> <duration>");
      return;
    }

    const target = message.mentions.members?.first();
    const duration = args[1];

    if (!target) {
      message.reply("You didnt mention anyone!");
      return;
    }

    target.roles.add(this.muteRole);
  }

  // durationFromString(value: string) {
  //     let duration = 0;

  //     for (let singleValue of value.split(" ")) {
  //         let tmpDuration = 0
  //         let idk = singleValue.replace(/[0-9]+/, "")

  //         switch(idk) {
  //             case "d":
  //         }
  //     }

  // }
}

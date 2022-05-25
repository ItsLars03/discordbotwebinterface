import { ClientUser, GuildMember, Message, User } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

export default class BanCommand extends BaseCommand {
  constructor() {
    super("ban", "moderation", {});
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    if (args.length < 1) {
      message.reply("!ban <target>");
      return;
    }

    if (!message.member?.permissions.has("BAN_MEMBERS")) {
    message.reply(":x: **Je hebt geen permissies om iemand te verbannen.**");
    }

    if (message.member?.permissions.has("BAN_MEMBERS")) {
    const target = message.mentions.members?.first();
    if (!target) {
      message.reply(":x: **De genoemde gebruiker " + message.content.slice(5) + "' bestaat niet**");
      return;
    }
    else if (!target.permissions.has("ADMINISTRATOR"||"BAN_MEMBERS")) {
      target.ban();
      message.reply(":white_check_mark: **Je hebt succesvol " + target.user.username + " verbannen!**");
      return; 
    } 
    else{
    message.reply(":x: **" + target.user.username + " is een administrator en kan daarom niet verbannen worden.**"); 
    return;
    }}
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

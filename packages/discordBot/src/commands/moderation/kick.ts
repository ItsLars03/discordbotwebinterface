import { ClientUser, Guild, GuildMember, Message, User } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

export default class KicksCommand extends BaseCommand {
  constructor() {
    super("kick", "moderation", {});
  }


  async run(client: DiscordClient, message: Message, args: Array<string>) {

    if (args.length < 1) {
      message.reply("!kick <target>");
      return;
    }

// message.guild?.members?.cache?.get(client?.user?.id ?? "")?.permissions?.has("BAN_MEMBERS");

    if (!message.member?.permissions.has("KICK_MEMBERS")) {
    message.reply(":x: **Je hebt geen permissies om iemand te kicken.**");
    return;
    }
    

    if (message.member?.permissions.has("KICK_MEMBERS")) {
    const target = message.mentions.members?.first();
    if (!target) {
      message.reply(":x: **De genoemde gebruiker '" + message.content.slice(5) + "' bestaat niet**");
      return;
    }
    
    else if (!target.permissions.has("ADMINISTRATOR"||"KICK_MEMBERS")) {
      target.kick();
      message.reply(":white_check_mark: **Je hebt succesvol " + target.user.username + " gekickt!**");
      return; 
    } 
    else{
    message.reply(":x: **" + target.user.username + " is een administrator en kan daarom niet gekickt worden.**"); 
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

import { MessageOptions, MessagePayload } from "discord.js";
import { PermissionResolvable, Role, Snowflake } from "discord.js";
import * as EventEmitter from "events";

declare type MessageType = string | MessagePayload | MessageOptions;

export class StateManager extends EventEmitter {
  constructor();

  public on(
    event: WsEvents,
    listener: (data: any, shardID: number) => void
  ): this;
  public once(
    event: WsEvents,
    listener: (data: any, shardID: number) => void
  ): this;
  public emit(event: WsEvents, ...args: unknown[]): any;
}

type WsEvents =
  | "UPDATENICKNAMES"
  | "WS_READY"
  | "WS_PREREADY"
  | "CREATETICKET"
  | "PRE"
  | "PERSISTENT_MESSAGES"
  | "APPLICATION_ACCEPT"
  | "APPLICATION_REJECT"
  | "APPLICATION_VOTES_REQUIRED"
  | "APPLICATION_CLOSE";

type discordEvents =
  | "applicationCommandCreate"
  | "applicationCommandDelete"
  | "applicationCommandUpdate"
  | "channelCreate"
  | "channelDelete"
  | "channelPinsUpdate"
  | "channelUpdate"
  | "debug"
  | "warn"
  | "emojiCreate"
  | "emojiDelete"
  | "emojiUpdate"
  | "error"
  | "guildBanAdd"
  | "guildBanRemove"
  | "guildCreate"
  | "guildDelete"
  | "guildUnavailable"
  | "guildIntegrationsUpdate"
  | "guildMemberAdd"
  | "guildMemberAvailable"
  | "guildMemberRemove"
  | "guildMembersChunk"
  | "guildMemberUpdate"
  | "guildUpdate"
  | "inviteCreate"
  | "inviteDelete"
  | "message"
  | "messageCreate"
  | "messageDelete"
  | "messageReactionRemoveAll"
  | "messageReactionRemoveEmoji"
  | "messageDeleteBulk"
  | "messageReactionAdd"
  | "messageReactionRemove"
  | "messageUpdate"
  | "presenceUpdate"
  | "rateLimit"
  | "invalidRequestWarning"
  | "ready"
  | "invalidated"
  | "roleCreate"
  | "roleDelete"
  | "roleUpdate"
  | "threadCreate"
  | "threadDelete"
  | "threadListSync"
  | "threadMemberUpdate"
  | "threadMembersUpdate"
  | "threadUpdate"
  | "typingStart"
  | "userUpdate"
  | "voiceStateUpdate"
  | "webhookUpdate"
  | "interaction"
  | "interactionCreate"
  | "shardDisconnect"
  | "shardError"
  | "shardReady"
  | "shardReconnecting"
  | "shardResume"
  | "stageInstanceCreate"
  | "stageInstanceUpdate"
  | "stageInstanceDelete"
  | "stickerCreate"
  | "stickerDelete"
  | "stickerUpdate";

interface CommandOptions {
  disabled?: boolean;
  aliases?: string[];
  permission?: PermissionResolvable;
  roleRequired?: Role | Snowflake;
  channelCooldown?: number; // seconds
  guildCooldown?: number; // seconds
  userCooldown?: number; // seconds
  loadDev?: boolean;
  description?: string;
  loadSlashCommand?: boolean; // whether to register a slashcommand or not
}

interface EventOptions {
  disabled?: boolean;
}

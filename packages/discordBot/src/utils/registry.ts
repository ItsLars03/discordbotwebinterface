import * as path from "path";
import { promises as fs } from "node:fs";
import DiscordClient from "../client/client";
import { clientEvents } from "../client/clientEvents";
import BaseCustomEvent from "./structures/BaseCustomEvent";
import BaseSocketEvent from "./structures/BaseSocketEvent";

export async function registerCommands(
  client: DiscordClient,
  dir: string = ""
): Promise<void> {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory())
      await registerCommands(client, path.join(dir, file));
    if (file.endsWith(".js") || file.endsWith(".ts")) {
      const { default: Command } = await import(path.join(dir, file));
      const command = new Command();
      if (command.options.disabled) continue;
      //   if (global.isDev && !command.options.loadDev) continue;
      console.log(`[Commands] registering ${path.join(dir, file)}`);
      if (command.init instanceof Function) {
        command.init(client);
      }
      client.commands.set(command.getName(), command);
      command.options.aliases?.forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

export async function registerEvents(
  client: DiscordClient,
  dir: string = ""
): Promise<void> {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) await registerEvents(client, path.join(dir, file));
    if (file.endsWith(".js") || file.endsWith(".ts")) {
      let Event: any, event: any;
      try {
        Event = (await import(path.join(dir, file))).default;
        event = new Event();
      } catch (e) {
        console.error("[EVENT REGISTRY]", path.join(dir, file), e);
        continue;
      }
      if (event.options?.disabled) continue;
      if (clientEvents.includes(event.getName())) {
        console.log(
          `[Events - Discord] registering event => ${path.join(dir, file)}`
        );
        client.events.push(event);
        client.on(event.getName(), event.run.bind(event, client));
      } else if (event instanceof BaseCustomEvent) {
        console.log(
          `[Events - Custom] registering event => ${path.join(dir, file)}`
        );
        client.customEvents.push(event);
        global.ws.on(event.getName(), event.run.bind(event, client));
      } else if (event instanceof BaseSocketEvent) {
        console.log(
          `[Events - Socket] registering event => ${path.join(dir, file)}`
        );
        client.socketEvents.push(event);
        global.socket.on(event.getName(), event.run.bind(event, client));
      }

      if (event.init instanceof Function) {
        event.init(client);
      }
    }
  }
}

// export async function registerSlashCommands(client: DiscordClient) {
// 	console.log(1)

// 	const commands = client.commands.filter((v, k) => v.getName() === k && v.getOptions().loadSlashCommand == true).map((v, k) => {
// 		console.log("[SLASH COMMAND]", v.getName())
// 		const command = new SlashCommandBuilder().setName(v.getName())
// 		const desc = v.getOptions().description
// 		if (typeof desc === "string" && desc.length > 0 && desc.length <= 100) {
// 			command.setDescription(desc)
// 		} else {
// 			command.setDescription("Description not set.")
// 		}
// 		return command
// 	})

// 	console.log(commands.length, commands)

// 	await global.rest.put(
// 		Routes.applicationCommands(global.globalConfig.bot.applicationId),
// 		{ body: commands }
// 	)
// }

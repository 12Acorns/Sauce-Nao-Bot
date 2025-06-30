import { Guild, REST, Routes, ApplicationCommandDataResolvable } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { guildId } from "../config.json"
import { CommandEntry } from "./commands/CommandEntry";

const commandsData = Array.from(commands.entries()).map(entry => entry[1].data)
const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);

export async function deployCommands(guild: Guild) {
  try {
    console.log("Started refreshing application (/) commands.");
    await guild.commands.set(commandsData).catch(err => {
      console.error(`Unable to set command in guild '${guild.name} | ${guild.id}: `, err)
    })
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
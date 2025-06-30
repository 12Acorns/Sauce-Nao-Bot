import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { config } from "./config"
import { commands } from "./commands"
import { deployCommands } from "./deployCommands"


// Require the necessary discord.js classes
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages
	]
})

client.once("ready", async () => {
	// client.guilds.cache.forEach(async guild => {
	// 	await deployCommands(guild);
	// });
	console.log("Discord bot is ready!");
});

client.on("guildCreate", async (guild) => {
	await deployCommands(guild);
	console.log("joined guild")
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) {
	  return;
	}
	const { commandName } = interaction;
	if (commands.has(commandName)) {
	  await commands.get(commandName)?.execute(interaction);
	}
});

client.on("error", (err) => {
	console.log(err)
})

client.login(config.DISCORD_BOT_TOKEN)
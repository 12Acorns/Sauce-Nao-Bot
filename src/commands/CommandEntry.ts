import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js"

export type CommandEntry = {
    name: string
    data: RESTPostAPIChatInputApplicationCommandsJSONBody
    execute(interaction: CommandInteraction): Promise<void>
}
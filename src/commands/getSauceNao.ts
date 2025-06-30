import { APIEmbedField, InteractionReplyOptions, ChatInputCommandInteraction, Colors, Embed, EmbedBuilder, SlashCommandAttachmentOption, SlashCommandBuilder, UnfurledMediaItem, MessagePayload, MessageComponentInteraction, MessageType, MessageTarget } from "discord.js";
import { OptionEntry } from "../util/OptionEntry";
import { CommandEntry } from "./CommandEntry"
import { DbUsage } from "../util/DbUsage";
import { error } from "console";
import { ResponseBody, Result } from "../util/ResponceBody";
import { get } from "../util/SauceGet";
import { VisibilityOptions } from "../util/VisibilityOptions";
import { WriteStream, ReadStream } from "fs"

const name: string = "get-sauce"
const sauceImageName: string = "sauce-image"
const data = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Get the sauce to an attached image using saucenao")
    .addAttachmentOption(new SlashCommandAttachmentOption()
            .setName(sauceImageName)
            .setDescription("The image used")
            .setRequired(true))
    .toJSON()
async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const image = interaction.options.getAttachment(sauceImageName)
    if(!image)
    {
        console.log("Could not find image attached")
        await interaction.reply("No attachment found.")
        return
    }
    const body: ResponseBody = await get({
        ImageUrl: image.url,
        DatabaseUsed: DbUsage.All,
        VisibilityOptions: VisibilityOptions.ShowAll
    })
    if(!body)
    {
        await interaction.reply("Unkown Error")
        return
    }
    if(body.header.returnedResults === 0)
    {
        await interaction.reply("No sources were found.")
        return;
    }
    const sauces = body.results
    const sauceImg = sauces[0].header.thumbnail
    const embedBuilder = new EmbedBuilder()
        .setTitle("Sauce Details")
        .setColor(Colors.Blue)
        .setImage(sauceImg)
        .setFields(getImageFieldData(sauces))
    await interaction.reply({ embeds: [embedBuilder] })
}

function getImageFieldData(sauces: Result[]): APIEmbedField[] {
    const pResult = sauces[0]
    const authorNames = pResult.data.authorName ?? pResult.data.creator ?? "No Author found"
    let authorNamesView: string = ""
    if(Array.isArray(authorNames))
    {
        authorNamesView = authorNames.join("\n")
    }
    else
    {
        authorNamesView = authorNames
    }
    const authorField = {
        name: "Author Name:",
        value: authorNamesView,
        inline: true
    }
    const similarityScore = pResult.header.similarity
    const similarityField = {
        name: "Similarity Score:",
        value: similarityScore,
        inline: true
    }
    const primarySauceField = {
        name: "Primary Sauce:",
        value: pResult.data.source ?? "No Primary Sauce Found",
        inline: true
    }
    const sauceUrlsS = sauces.map(sauce => {
        return sauce.data.ext_urls?.join("\n")
    }).join("\n")

    const sauceUrlsField = {
        name: "Sauces:",
        value: sauceUrlsS,
        inline: false
    }
    return [
        authorField,
        similarityField,
        primarySauceField,
        sauceUrlsField
    ]
}

export const getSauceCommand: CommandEntry = { name, data, execute }
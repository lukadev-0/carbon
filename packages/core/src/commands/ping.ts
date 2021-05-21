import { ApplicationCommandData, CommandInteraction, Message, MessageEmbed } from "discord.js";
import ms from 'ms'

export default {
    name: "ping",
    description: "Get the current ping",
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    await int.editReply("Getting the ping...")
    /*const reply: Message = await int.fetchReply()
    await int.webhook.send(
        new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Ping 🏓")
            .addField("It's:", ms(Date.now() - reply.createdTimestamp, { long: true }))
    )*/
}
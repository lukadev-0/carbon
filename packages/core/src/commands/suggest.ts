import {
    ApplicationCommandData,
    CommandInteraction,
    MessageEmbed,
    TextChannel,
} from 'discord.js'
import { client } from '../client'
import { isBad } from '../filter'
import variables from '../variables'

export default {
    name: 'suggest',
    description: 'Suggest something',
    options: [
        {
            name: 'suggestion',
            description: 'Your suggestion',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    if (await isBad(int.options[0].value as string))
        return int.editReply(':x: Your message has been filtered!')
    try {
        const member = int.user
        const channel = await client.channels.fetch(
            variables.SUGGESTION_CHANNEL
        )
        const embed = new MessageEmbed()
            .setTitle('Suggestion')
            .setAuthor(
                member.tag,
                member.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 4096,
                })
            )
            .setColor('GREEN')
            .setDescription(int.options[0].value)
            .setFooter(member.id)
        await (channel as TextChannel).send(embed)
        await int.editReply('Suggestion sent!')
    } catch (e) {
        await int.editReply(`Your suggestion has failed, ${e.message}`)
    }
}

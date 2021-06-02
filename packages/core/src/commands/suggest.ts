import {
    MessageEmbed,
    TextChannel,
} from 'discord.js'
import { client } from '../client'
import { error as CarbonErrorEmoji } from '../constants/emojis'
import { isBad } from '../filter'
import BaseCommand from '../others/BaseCommand'
import variables from '../variables'

export default new BaseCommand({
    name: 'suggest',
    description: 'Suggest something',
    module: 'suggestions',
    options: [
        {
            name: 'suggestion',
            description: 'Your suggestion',
            type: 'STRING',
            required: true,
        },
    ],
    run: async function(int) {
        if (await isBad(int.options[0].value as string))
            return int.editReply(`${CarbonErrorEmoji} Your message has been filtered!`)
        const member = int.user
        const channel = await client.channels.fetch(
            variables.SUGGESTION_CHANNEL,
        )
        const embed = new MessageEmbed()
            .setTitle('Suggestion')
            .setAuthor(
                member.tag,
                member.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 4096,
                }),
            )
            .setColor('GREEN')
            .setDescription(int.options[0].value as string)
            .setFooter(member.id)
        await (channel as TextChannel).send(embed)
        await int.editReply('Suggestion sent!')
    },
})
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
        const content = int.options.get('suggestion')?.value as string
        if (await isBad(content))
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
            .setDescription(content)
            .setFooter(member.id)
        await (channel as TextChannel).send(embed)
        await int.editReply('Suggestion sent!')
    },
})
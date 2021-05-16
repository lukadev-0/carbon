import {
    ApplicationCommandData,
    CommandInteraction,
    GuildMember,
    MessageEmbed,
    TextChannel,
} from 'discord.js'
import { client } from '../client'
import overrideRegex from '../others/overrideRegex'
import variables from '../variables'

export default {
    name: 'respondtosuggestion',
    description: 'Respond to a suggestion',
    defaultPermission: false,
    options: [
        {
            name: 'messageid',
            description: 'Message ID of the suggestion',
            type: 'STRING',
            required: true,
        },
        {
            name: 'implemented',
            description: 'Is this suggestion implemented?',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Considered',
                    value: 'Considered',
                },
                {
                    name: 'Accepted',
                    value: 'Accepted',
                },
                {
                    name: 'Denied',
                    value: 'Denied',
                },
            ],
        },
        {
            name: 'comment',
            description: 'A comment on this suggestion',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction) {
    const channel = await client.channels.fetch(variables.SUGGESTION_CHANNEL)
    const message = await (channel as TextChannel).messages.fetch(
        int.options[0].value as string
    )
    const embed = message.embeds[0]
    embed.addField(
        `${int.user.tag}: ${int.options[1].value}`,
        int.options[2].value,
        false
    )
    await message.edit(embed)
    await int.editReply('Successfully responded!')
    const toDM = await client.users.fetch(embed.footer!.text!)
    const embed2 = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(
            int.user.tag,
            int.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096,
            })
        )
        .setTitle(`${int.user.username} responded to your suggestion`)
        .setDescription(
            `[Go to suggestion](https://discord.com/channels/${int.guildID}/${message.channel.id}/${message.id})`
        )
        .addFields(
            {
                name: 'Status',
                value: int.options[1].value,
            },
            {
                name: 'Reply',
                value: int.options[2].value,
            }
        )
    toDM.send(embed2).catch((erro) => {
        console.log(erro.message)
    })
}

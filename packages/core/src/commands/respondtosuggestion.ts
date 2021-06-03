import {
    MessageEmbed,
    Snowflake,
    TextChannel,
} from 'discord.js'
import { client } from '../client'
import BaseCommand from '../others/BaseCommand'
import variables from '../variables' 
const { SUGGESTION_CHANNEL } = variables

export default new BaseCommand({
    name: 'respondtosuggestion',
    description: 'Respond to a suggestion',
    module: 'suggestions',
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
    run: async function(int) {
        const messageId = int.options.get('messageid')?.value as Snowflake
        const implemented = int.options.get('implemented')?.value as string
        const comment = int.options.get('comment')?.value as string
        const channel = await client.channels.fetch(SUGGESTION_CHANNEL)
        const message = await (channel as TextChannel).messages.fetch(
            messageId,
        )
        const embed = message.embeds[0]
        embed.addField(
            `${int.user.tag}: ${implemented}`,
            comment,
            false,
        )
        await message.edit(embed)
        await int.editReply('Successfully responded!')
        const toDM = await client.users.fetch(embed.footer!.text! as Snowflake)
        const embed2 = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(
                int.user.tag,
                int.user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 4096,
                }),
            )
            .setTitle(`${int.user.username} responded to your suggestion`)
            .setDescription(
                `[Go to suggestion](https://discord.com/channels/${int.guildID}/${message.channel.id}/${message.id})`,
            )
            .addFields(
                [
                    {
                        name: 'Status',
                        value: implemented,
                    },
                    {
                        name: 'Reply',
                        value: comment,
                    },
                ],
            )
        toDM.send(embed2).catch((erro: { message: string }) => {
            console.log(erro.message)
        })
    },
})
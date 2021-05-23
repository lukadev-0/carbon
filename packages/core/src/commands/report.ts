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

function truncate(string: string, length: number) {
    return string.length > length ? string.slice(0, length - 3) + '...' : string
}

export default {
    name: 'report',
    description: 'Report a user for breaking the rules.',
    module: 'report',
    options: [
        {
            name: 'user',
            description: 'User to report',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Report reason',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    try {
        const reportChannel = (await client.channels.fetch(
            variables.REPORT_CHANNEL,
        )) as TextChannel
        const user: GuildMember = int.options[0].member
        if (int.user.id === user.id) {
            return await int.editReply('You cannot report yourself.')
        }
        if (
            user.roles.cache.some((role) =>
                Boolean(role.name.match(overrideRegex)),
            )
        ) {
            return await int.editReply(
                'You cannot report a moderator or the owner.',
            )
        }
        int.editReply(
            'While we report here is a fun fact:\nAbusing this command will get you banned',
        )
        reportChannel.send(
            new MessageEmbed()
                .setTitle('Report')
                .setColor('RED')
                .setAuthor(
                    int.user.tag,
                    int.user.displayAvatarURL({
                        size: 4096,
                        dynamic: false,
                        format: 'png',
                    }),
                )
                .setDescription(
                    `${int.user.toString()} has reported ${user.user.toString()}`,
                )
                .addField(
                    'Reason',
                    truncate(int.options[1].value as string, 1024),
                ),
        )
        int.editReply('Successfully reported!')
    } catch (e) {
        int.editReply(`Your report has failed, ${e.message}`)
    }
}

import {
    ApplicationCommandData,
    CommandInteraction,
    MessageEmbed,
} from 'discord.js'
import { client } from '../client'

export default {
    name: 'avatar',
    description: "Get someone's avatar!",
    options: [
        {
            name: 'user',
            description: 'The user to get avatar from',
            type: 'USER',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    const member = await client.users.fetch(int.options[0].value as string)
    const avatar = member.displayAvatarURL({
        size: 4096,
        dynamic: true,
        format: 'png',
    })
    int.editReply(
        new MessageEmbed()
            .setTitle(`${member.username}'s avatar!`)
            .setColor('RANDOM')
            .setImage(avatar)
    )
}

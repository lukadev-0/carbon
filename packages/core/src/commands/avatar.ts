import { MessageEmbed } from 'discord.js'
import { client } from '../client'
import BaseCommand from '../others/BaseCommand'

export default new BaseCommand({
    name: 'avatar',
    description: "Get someone's avatar!",
    module: 'others_avatar',
    options: [
        {
            name: 'user',
            description: 'The user to get avatar from',
            type: 'USER',
            required: true,
        },
    ],
}, async function(int) {
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
            .setImage(avatar),
    )
})

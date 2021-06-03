import { MessageEmbed } from 'discord.js'
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
    run: async function(int) {
        const user = int.options.get('user')?.user
        const avatar = user!.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
        })
        int.editReply(
            new MessageEmbed()
                .setTitle(`${user!.username}'s avatar!`)
                .setColor('RANDOM')
                .setImage(avatar),
        )
    },
})

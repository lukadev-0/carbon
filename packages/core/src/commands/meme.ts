import {
    ApplicationCommandData,
    CommandInteraction,
    MessageEmbed,
} from 'discord.js'
import { get } from 'reddit-grabber'

export default {
    name: 'meme',
    description: 'Get a meme from reddit',
    module: 'others_meme',
    options: [
        {
            name: 'subreddit',
            description: 'Subreddit to fetch from',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    try {
        const img = await get(
            Math.round(Math.random()) === 0 ? 'Image' : 'Video',
            int.options[0].value as string,
            false,
        )

        const embed = new MessageEmbed()
            .setAuthor(img.author)
            .setTitle(img.title)
            .setURL(img.url)
            .setColor('RANDOM')
            .setImage(img.media)

        await int.editReply(embed)
    } catch (err) {
        await int.editReply(`\`\`\`js\n${err.message}\`\`\``)
    }
}

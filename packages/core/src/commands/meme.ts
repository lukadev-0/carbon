import {
    ApplicationCommandOption,
    CommandInteraction,
    MessageEmbed,
} from 'discord.js'
import { get } from 'reddit-grabber'

export default {
    name: 'meme',
    description: 'Get a meme from reddit',
    options: [
        {
            name: 'subreddit',
            description: 'Subreddit to fetch from',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandOption

export async function run(int: CommandInteraction) {
    try {
        const img = await get(
            Math.round(Math.random()) === 0 ? 'Image' : 'Video',
            int.options[0].value as string,
            false
        )

        const Embed = new MessageEmbed()
            .setAuthor(img.author)
            .setTitle(img.title)
            .setURL(img.url)
            .setColor('RANDOM')
            .setImage(img.media)

        await int.editReply(Embed)
    } catch (err) {
        await int.editReply(`\`\`\`js\n${err.message}\`\`\``)
    }
}

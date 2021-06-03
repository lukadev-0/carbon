import { MessageEmbed } from 'discord.js'
import BaseCommand from '../others/BaseCommand'
import { get } from 'reddit-grabber'

export default new BaseCommand({
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
    run: async function(int) {
        const subreddit = int.options.get('subreddit')?.value as string
        const img = await get(
            Math.round(Math.random()) === 0 ? 'Image' : 'Video',
            subreddit,
            false,
        )

        const embed = new MessageEmbed()
            .setAuthor(img.author)
            .setTitle(img.title)
            .setURL(img.url)
            .setColor('RANDOM')
            .setImage(img.media)

        await int.editReply(embed)
    },
})
const { MessageEmbed } = require('discord.js')
const redditFetcher = require('@daimond113/reddit-fetcher')
const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
let dispatcher

module.exports = class Meme extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'meme',
			description: 'Get a meme from reddit',
		})
	}
	/**
	 *
	 * @param {Interaction} ctx
	 */
	async run(ctx) {
		await ctx.showLoadingIndicator(false)
		try {
			const subreddits = ['Dank', 'memes', 'funny', 'darkmode']
			const subreddit =
				subreddits[Math.floor(Math.random() * subreddits.length)]
			let img
			if (Math.round(Math.random()) === 0) {
				img = await redditFetcher.return('Image', subreddit, false)
			} else {
				img = await redditFetcher.return('Video', subreddit, false)
			}
			const Embed = new MessageEmbed()
				.setTitle(`A meme from reddit. (${subreddit})`)
				.setURL(`https://www.reddit.com/r/${subreddit}`)
				.setColor('RANDOM')
				.setImage(img)

			await ctx.respond({
				embeds: [Embed.toJSON()],
			})
		} catch (err) {
			console.log(err)
			await ctx.respond({
				content: err.message,
			})
		}
	}
}

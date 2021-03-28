const { MessageEmbed } = require('discord.js')
const redditFetcher = require('@daimond113/reddit-fetcher')
const { post, update } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'Getting a result...')
	try {
		const subreddits = ['Dank', 'memes', 'funny', 'darkmode']
		const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)]
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

		update(int, 'Got a meme!', Embed)
	} catch (err) {
		console.log(err)
		update(int, err.message)
	}
}

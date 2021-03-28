const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const client = require('../client')
const { post, update } = require('../interactionHandler')
const { MessageEmbed } = require('discord.js')
let dispatcher

module.exports = async (int) => {
	await post(int, 'Searching...')
	const channel = await client.channels.fetch(int.channel_id)
	switch (int.data.options[0].value) {
		case 'play':
			const guild = await client.guilds.fetch(int.guild_id)
			const member = await guild.members.fetch(int.member.user.id)
			if (!member.voice.channel) {
				update(int, 'Please join a voice channel first!')
			}
			const connection = await member.voice.channel.join()
			const toSearch = int.data.options[1]
			const url = await ytsr(toSearch.value, {
				safeSearch: false,
				limit: 1,
				nextpageRef: `https://www.youtube.com/results?search_query=${toSearch.value}&sp=EgIQAQ%253D%253D`,
			})
			const items = url.items[0]
			dispatcher = connection.play(ytdl(items.url))
			const embed = new MessageEmbed()
				.setAuthor(items.author.name, items.author.bestAvatar.url)
				.setTitle(items.title)
				.setURL(items.url)
				.setThumbnail(items.thumbnails[0].url)
				.setDescription(items.description)
				.setColor('RED')
			update(int, `Playing ${items.title}`, embed)
			break
		case 'pause':
			if (dispatcher) {
				dispatcher.pause()
				update(int, 'Paused!')
			} else {
				update(int, "Nothing's playing right now!")
			}
			break
		case 'disconnect':
			if (dispatcher) {
				dispatcher.end()
				channel.guild.me.voice.connection.disconnect()
				dispatcher = null
				update(int, 'Disconnected!')
			} else {
				update(int, 'I am not in a channel!')
			}
			break
		case 'resume':
			if (dispatcher) {
				dispatcher.resume()
				update(int, 'Resumed!')
			} else {
				update(int, "Nothing's paused!")
			}
			break
		default:
			break
	}
}

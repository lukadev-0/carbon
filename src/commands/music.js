const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
const client = require('../client')
const ytsr = require('ytsr')
const ytdl = require('ytdl-core')
const { MessageEmbed } = require('discord.js')
let dispatcher

module.exports = class Music extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'music',
			description: 'Play music',
			options: [
				{
					name: 'Command',
					description: 'Command to use',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Play',
							value: 'play',
						},
						{
							name: 'Pause',
							value: 'pause',
						},
						{
							name: 'Disconnect',
							value: 'disconnect',
						},
						{
							name: 'Resume',
							value: 'resume',
						},
					],
				},
				{
					name: 'toplay',
					description: 'A video title to play (ONLY VALID IN THE PLAY COMMAND)',
					type: 3,
					required: true,
				},
			],
		})
	}
	/**
	 *
	 * @param {Interaction} ctx
	 */
	async run(ctx) {
		await ctx.showLoadingIndicator(false)
		const channel = await client.channels.fetch(ctx.channel_id)
		switch (ctx.data.options[0].value) {
			case 'play':
				const guild = await client.guilds.fetch(ctx.guild_id)
				const member = await guild.members.fetch(ctx.member.user.id)
				if (!member.voice.channel) {
					await ctx.respond({
						content: 'Please join a voice channel first!',
					})
					return
				}
				const connection = await member.voice.channel.join()
				const toSearch = ctx.data.options[1]
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
				await ctx.respond({
					embeds: [embed.toJSON()],
				})
				break
			case 'pause':
				if (dispatcher) {
					dispatcher.pause()
					await ctx.respond({
						content: 'Paused!',
					})
				} else {
					await ctx.respond({
						content: "Nothing's playing right now!",
					})
				}
				break
			case 'disconnect':
				if (dispatcher) {
					dispatcher.end()
					channel.guild.me.voice.connection.disconnect()
					dispatcher = null
					await ctx.respond({
						content: 'Disconnected!',
					})
				} else {
					await ctx.respond({
						content: 'I am not in a voice channel!',
					})
				}
				break
			case 'resume':
				if (dispatcher) {
					dispatcher.resume()
					ctx.respond({
						content: 'Resumed!',
					})
				} else {
					ctx.respond({
						content: "Nothing's paused!",
					})
				}
				break
			default:
				break
		}
	}
}

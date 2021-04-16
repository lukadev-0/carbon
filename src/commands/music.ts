import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'
import { client } from '../client'
import ytsr from 'ytsr'
import ytdl from 'ytdl-core'
import { MessageEmbed, StreamDispatcher, TextChannel } from 'discord.js'
let dispatcher: StreamDispatcher | null

export default class Music extends SlashCommand {
	constructor(manager: CommandManager) {
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

	async run(ctx: Interaction) {
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

				const filters = await ytsr.getFilters(toSearch.value)
				const filter = filters.get('Type')!.get('Video')!

				const results = await ytsr(filter.url!, {
					safeSearch: false,
					limit: 1,
				})

				const item = results.items[0] as ytsr.Video

				dispatcher = connection.play(ytdl(item.url))

				const embed = new MessageEmbed()
					.setAuthor(item.author!.name, item.author!.bestAvatar.url ?? undefined)
					.setTitle(item.title)
					.setURL(item.url)
					.setThumbnail(item.thumbnails[0].url!)
					.setDescription(item.description)
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
						; (channel as TextChannel).guild.me!.voice.connection!.disconnect()
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

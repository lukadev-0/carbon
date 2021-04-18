import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'
import { client } from '../client'
import { MessageEmbed, StreamDispatcher, VoiceConnection } from 'discord.js'
import ytsr from 'ytsr'
import ytdl from 'ytdl-core'
let dispatcher: StreamDispatcher | null
let connection: VoiceConnection | null
export default class Music extends SlashCommand {
	constructor(manager: CommandManager) {
		super(manager, {
			name: 'music',
			description: 'Music commands',
			options: [
				{
					name: 'play',
					description: 'Play music',
					type: 1,
					options: [
						{
							name: 'name',
							description: 'Name of the song to play',
							type: 3,
							required: true,
						},
					],
				},
				{
					name: 'pause',
					description: "Pause what's playing",
					type: 1,
				},
				{
					name: 'resume',
					description: 'Resume what was playing',
					type: 1,
				},
				{
					name: 'disconnect',
					description: 'Disconnect me from the voice channel',
					type: 1,
				},
			],
		})
	}

	async run(ctx: Interaction) {
		await ctx.showLoadingIndicator(false)
		try {
			const options = ctx.data.options[0]
			const member = await (
				await client.guilds.fetch(ctx.guild_id)
			).members.fetch(ctx.member.user.id)
			switch (options.name) {
				case 'play':
					const v = options?.options[0].value
					if (!member.voice.channel) {
						await ctx.respond({
							content: 'Please join a voice channel first!',
						})
						return
					}
					connection = await member.voice.channel.join()
					const filter = (await ytsr.getFilters(v)).get('Type')!.get('Video')!

					const results = await ytsr(filter.url!, {
						safeSearch: false,
						limit: 1,
					})
					const item = results.items[0] as ytsr.Video
					await ctx.respond({
						embeds: [
							new MessageEmbed()
								.setAuthor(
									item.author!.name,
									item.author!.bestAvatar.url ?? undefined
								)
								.setTitle(item.title)
								.setURL(item.url)
								.setThumbnail(item.thumbnails[0].url!)
								.setDescription(item.description ?? 'No description.')
								.setColor('RED')
								.toJSON(),
						],
					})
					dispatcher = connection.play(ytdl(item.url))
					break
				case 'pause':
					if (member.voice.channel) {
						dispatcher?.pause()
						ctx.respond({
							content: 'Paused!',
						})
					} else {
						ctx.respond({
							content: "You're not in a voice channel!",
						})
					}
					break
				case 'resume':
					if (member.voice.channel) {
						dispatcher?.resume()
						ctx.respond({
							content: 'Resumed!',
						})
					} else {
						ctx.respond({
							content: "You're not in a voice channel!",
						})
					}
					break
				case 'disconnect':
					if (member.voice.channel) {
						connection?.disconnect()
						ctx.respond({
							content: 'Disconnected!',
						})
					} else {
						ctx.respond({
							content: "You're not in a voice channel!",
						})
					}
					break
				default:
					break
			}
		} catch (e) {
			console.log(e)
		}
	}
}

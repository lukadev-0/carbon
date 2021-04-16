import { MessageEmbed } from 'discord.js'
import { SlashCommand, CommandManager } from 'discord-interactive-core'
import { client } from '../client'
import Interaction from 'discord-interactive-core/types/Interaction'

export default class Avatar extends SlashCommand {
	constructor(manager: CommandManager) {
		super(manager, {
			name: 'avatar',
			description: "Get someone's avatar!",
			options: [
				{
					name: 'User',
					description: 'The user to get avatar from',
					type: 6,
					required: true,
				},
			],
		})
	}

	async run(ctx: Interaction) {
		await ctx.showLoadingIndicator(false)

		const user = await client.users.fetch(ctx.data.options[0].value)

		const json = new MessageEmbed()
			.setTitle(`${user.username}'s avatar!`)
			.setColor('RANDOM')
			.setImage(
				user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
			)
			.toJSON()

		await ctx.respond({
			content: 'Got the avatar!',
			embeds: [json],
		})
	}
}

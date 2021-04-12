const { MessageEmbed } = require('discord.js')
const { SlashCommand } = require('discord-interactive-core')
const client = require('../client')
const Interaction = require('discord-interactive-core/src/Interaction')

module.exports = class Avatar extends SlashCommand {
	constructor(manager) {
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
	/**
	 *
	 * @param {Interaction} ctx
	 */
	async run(ctx) {
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

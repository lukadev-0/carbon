const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
const { MessageEmbed } = require('discord.js')
const client = require('../client')
const filter = require('../filter')

module.exports = class Suggest extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'suggest',
			description: 'Suggest something',
			options: [
				{
					name: 'Suggestion',
					description: 'Your suggestion',
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
		if (filter.isBad(ctx.data.options[0].value)) {
			return ctx.respond({
				content: ':x: Your message has been filtered'
			})
		}

		await ctx.showLoadingIndicator(false)
		try {
			const member = await client.users.fetch(ctx.member.user.id)
			const channel = await client.channels.fetch(
				process.env.SUGGESTION_CHANNEL
			)
			const embed = new MessageEmbed()
				.setTitle('Suggestion')
				.setAuthor(
					member.tag,
					member.displayAvatarURL({
						format: 'png',
						dynamic: true,
						size: 4096,
					})
				)
				.setColor('GREEN')
				.setDescription(ctx.data.options[0].value)
				.setFooter(member.id)
			await channel.send(embed)
			await ctx.respond({
				content: 'Successfuly send the suggestion',
			})
		} catch (erro) {
			console.log(erro)
			await ctx.respond({
				content: 'Your suggestion has failed!',
			})
		}
	}
}

import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'
import { MessageEmbed, TextChannel } from 'discord.js'
import { client } from '../client'
import { isBad } from '../filter'

export default class Suggest extends SlashCommand {
	constructor(manager: CommandManager) {
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
	async run(ctx: Interaction) {
		if (isBad(ctx.data.options[0].value)) {
			return ctx.respond({
				content: ':x: Your message has been filtered'
			})
		}

		await ctx.showLoadingIndicator(false)
		try {
			const member = await client.users.fetch(ctx.member.user.id)
			const channel = await client.channels.fetch(
				process.env.SUGGESTION_CHANNEL!
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
			await (channel as TextChannel).send(embed)
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

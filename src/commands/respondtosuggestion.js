const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
const { MessageEmbed } = require('discord.js')
const client = require('../client')

module.exports = class RespondToSuggestion extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'respondtosuggestion',
			description: 'Respond to a suggestion',
			options: [
				{
					name: 'MessageID',
					description: 'Message ID of the suggestion',
					type: 3,
					required: true,
				},
				{
					name: 'Implemented',
					description: 'Is this suggestion implemented?',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Considered',
							value: 'Considered',
						},
						{
							name: 'Accepted',
							value: 'Accepted',
						},
						{
							name: 'Denied',
							value: 'Denied',
						},
					],
				},
				{
					name: 'Comment',
					description: 'A comment on this suggestion',
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
		const guild = await client.guilds.fetch(ctx.guild_id)
		const user = await guild.members.fetch(ctx.member.user.id)
		if (user.roles.cache.some((role) => role.name.match(/moderator|owner/gi))) {
			const channel = await client.channels.fetch(
				process.env.SUGGESTION_CHANNEL
			)
			const message = await channel.messages.fetch(ctx.data.options[0].value)
			const embeds = await message.embeds
			const embed = embeds[0]
			embed.addField(
				`${user.user.tag}: ${ctx.data.options[1].value}`,
				ctx.data.options[2].value,
				false
			)
			await message.edit(embed)

			await ctx.respond({
				content: 'Successfuly responded',
			})
			const toDM = await client.users.fetch(embed.footer.text)
			const embed2 = new MessageEmbed()
				.setColor('GREEN')
				.setAuthor(
					user.user.tag,
					user.user.displayAvatarURL({
						format: 'png',
						dynamic: true,
						size: 4096,
					})
				)
				.setTitle('Responded to your suggestion')
				.setDescription(
					`Replied with: \n${ctx.data.options[2].value}\n[Go to suggestion](https://discord.com/channels/${ctx.guild_id}/${message.channel.id}/${message.id})`
				)
				.addField('Status: ', ctx.data.options[1].value)
			toDM.send(embed2).catch((erro) => {
				console.log(erro.message)
			})
		} else {
			update(int, "You're not a moderator or the owner!")
		}
	}
}

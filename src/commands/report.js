const { SlashCommand } = require('discord-interactive-core')
const client = require('../client')
const Interaction = require('discord-interactive-core/src/Interaction')

module.exports = class Report extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'report',
			description: 'Report a user for breaking the rules.',
			options: [
				{
					name: 'User',
					description: 'User to report',
					type: 6,
					required: true,
				},
				{
					name: 'Reason',
					description: 'Report reason',
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
		try {
			const options = ctx.data.options
			const toReport = options[0].value
			const reason = options[1].value
			const reportChannel = await client.channels.fetch(
				process.env.REPORT_CHANNEL
			)
			const guild = await client.guilds.fetch(ctx.guild_id)
			const user = await guild.members.fetch(toReport)
			if (ctx.member.user.id === toReport) {
				return await ctx.respond({
					content: 'You cannot report yourself',
				})
			}
			if (
				user.roles.cache.some((role) => role.name.match(/moderator|owner/gi))
			) {
				return await ctx.respond({
					content: 'You cannot report a moderator or the owner.',
				})
			}
			await ctx.respond({
				content:
					'Reporting...\nFun fact: abusing this command will get you banned',
			})
			await ctx.respond({
				content: `<@${ctx.member.user.id}>, successfuly reported <@${toReport}>`,
			})
			reportChannel.send(
				`<@${ctx.member.user.id}> has reported <@${toReport}> for "${reason}"`
			)
		} catch (erro) {
			console.log(erro)
			ctx.respond({
				content: 'Your report has failed',
			})
		}
	}
}

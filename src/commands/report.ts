import { CommandManager } from "discord-interactive-core"
import { SlashCommand } from 'discord-interactive-core'
import { client } from '../client'
import Interaction from 'discord-interactive-core/types/Interaction'
import { TextChannel } from "discord.js"

export default class Report extends SlashCommand {
	constructor(manager: CommandManager) {
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

	async run(ctx: Interaction) {
		await ctx.showLoadingIndicator(false)
		try {
			const options = ctx.data.options
			const toReport = options[0].value
			const reason = options[1].value
			const reportChannel = await client.channels.fetch(
				process.env.REPORT_CHANNEL!
			) as TextChannel
			const guild = await client.guilds.fetch(ctx.guild_id)
			const user = await guild.members.fetch(toReport)
			if (ctx.member.user.id === toReport) {
				return await ctx.respond({
					content: 'You cannot report yourself',
				})
			}
			if (
				user.roles.cache.some((role) => Boolean(role.name.match(/moderator|owner/gi)))
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

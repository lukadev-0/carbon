import { inspect } from 'util'
import { Util } from 'discord.js'
import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'

export default class Eval extends SlashCommand {
	constructor(manager: CommandManager) {
		super(manager, {
			name: 'eval',
			description: 'Run code (CREATOR ONLY)',
			options: [
				{
					name: 'Code',
					description: 'Code to run',
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
		await ctx.showLoadingIndicator(false)

		if (ctx.member.user.id !== process.env.OWNER_ID)
			return ctx.respond({ content: "You're not the owner!" })

		try {
			let evaled = eval(ctx.data.options[0].value)

			if (typeof evaled !== 'string') evaled = inspect(evaled)

			await ctx.respond({
				content: 'Successfully evaluated',
			})

			for (const code of Util.splitMessage(evaled)) {
				await ctx.respond({ content: `\`\`\`js\n${code}\`\`\`` })
			}
		} catch (err) {
			await ctx.respond({
				content: 'An error has occured!'
			})

			const error = err.message.replace('`', '`' + String.fromCharCode(8203))

			for (const code of Util.splitMessage(error)) {
				await ctx.respond({ content: `\`\`\`js\n${code}\`\`\`` })
			}
		}
	}
}

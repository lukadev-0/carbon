const { inspect } = require('util')
const { Util } = require('discord.js')
const { SlashCommand } = require('discord-interactive-core')
const client = require('../client')
const Interaction = require('discord-interactive-core/src/Interaction')

const zwsp = String.fromCharCode(8203)
const clean = (text) =>
	typeof text === 'string'
		? text.replace(/`/g, '`' + zwsp).replace(/@/g, '@' + zwsp)
		: text

module.exports = class Eval extends SlashCommand {
	constructor(manager) {
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
	async run(ctx) {
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
			for (const code of Util.splitMessage(clean(err))) {
				await ctx.respond({ content: `\`\`\`js\n${code}\`\`\`` })
			}
		}
	}
}

const owofire = require('owofire')
const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
const filter = require('../filter')

module.exports = class Owofy extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'owofy',
			description: 'Owofy some text',
			options: [
				{
					name: 'Text',
					description: 'Text to owofy',
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

		const content = owofire(ctx.data.options[0].value)

		if (filter.isBad(content)) {
			return ctx.respond({
				content: ':x: Your message has been filtered'
			})
		}

		await ctx.respond({
			content
		})
	}
}

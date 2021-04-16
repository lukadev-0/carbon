import owofire from 'owofire'
import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'
import { isBad } from '../filter'

export default class Owofy extends SlashCommand {
	constructor(manager: CommandManager) {
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

	async run(ctx: Interaction) {
		await ctx.showLoadingIndicator(false)

		const content = owofire(ctx.data.options[0].value)

		if (isBad(content)) {
			return ctx.respond({
				content: ':x: Your message has been filtered'
			})
		}

		await ctx.respond({
			allowed_mentions: {
				parse: []
			},
			content
		})
	}
}

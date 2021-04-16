import { CommandManager, SlashCommand } from 'discord-interactive-core'
import { sessions, closeSession } from '../others/handleHelpChannels'

import Interaction from 'discord-interactive-core/types/Interaction'

export default class Close extends SlashCommand {
	constructor(manager: CommandManager) {
		super(manager, {
			name: 'close',
			description: 'Close your help channel',
		})
	}

	async run(ctx: Interaction) {
		await ctx.showLoadingIndicator(true)

		const session = sessions.get(ctx.channel_id)

		if (session?.initMessage.member!.user.id === ctx.member.user.id) {
			await closeSession(session!)

			return ctx.respond({
				content: ':white_check_mark: Channel closed'
			})
		}

		return ctx.respond({
			content: ':x: Failed to close channel. You can only close help channels that you own.'
		})
	}
}

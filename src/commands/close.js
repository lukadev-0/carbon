const { SlashCommand } = require('discord-interactive-core')
const client = require('../client')
const Interaction = require('discord-interactive-core/src/Interaction')
const {
	closeChannel,
	getChannelOwner,
} = require('../others/handleHelpChannels')

module.exports = class Close extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'close',
			description: 'Close your help channel',
		})
	}
	/**
	 *
	 * @param {Interaction} ctx
	 */
	async run(ctx) {
		await ctx.showLoadingIndicator(false)
		const channel = await client.channels.fetch(ctx.channel_id)
		if (getChannelOwner(channel) === ctx.member.user.id) {
			closeChannel(channel)
			await ctx.respond({
				content: 'Closed your channel.',
			})
		} else {
			await ctx.respond({
				content: "This isn't your channel or it's not even a help channel!",
			})
		}
	}
}

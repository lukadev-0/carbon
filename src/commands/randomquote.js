const quotejs = require('quote.js')
const { registerFont, createCanvas } = require('canvas')
const { join } = require('path')
const { MessageAttachment } = require('discord.js')
const { SlashCommand } = require('discord-interactive-core')
const Interaction = require('discord-interactive-core/src/Interaction')
const client = require('../client')

registerFont(join(process.cwd(), 'src', 'assets', 'font.ttf'), {
	family: 'Old Standard TT',
})

module.exports = class RandomQuote extends SlashCommand {
	constructor(manager) {
		super(manager, {
			name: 'randomquote',
			description: 'Get a random quote!',
		})
	}
	/**
	 *
	 * @param {Interaction} int
	 */
	async run(int) {
		await int.showLoadingIndicator(false)
		const randomQuote = quotejs(1, { authorIsKnown: true })
		const canvas = createCanvas(1000, 300)
		const ctx = canvas.getContext('2d')
		ctx.fillStyle = '#000000'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#ffff'
		ctx.font = '30px Old Standard TT'
		ctx.fillText(
			`"${randomQuote[0].q}"`,
			0,
			canvas.height / 2.5,
			canvas.width - 5
		)
		ctx.fillText(
			`-${randomQuote[0].a}`,
			canvas.width / 1.4,
			canvas.height / 1.8,
			canvas.width / 1.4
		)
		const msg = new MessageAttachment(canvas.toBuffer())
		const channel = await client.channels.fetch(int.channel_id)
		const message = await channel.send(msg)
		await int.respond({
			content: 'Here is the quote!',
		})
	}
}

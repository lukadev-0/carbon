const quotejs = require('quote.js')

import { registerFont, createCanvas } from 'canvas'
import { join } from 'path'
import { MessageAttachment, TextChannel } from 'discord.js'
import { CommandManager, SlashCommand } from 'discord-interactive-core'
import Interaction from 'discord-interactive-core/types/Interaction'
import { client } from '../client'

registerFont(join(process.cwd(), 'src', 'assets', 'font.ttf'), {
	family: 'Old Standard TT',
})

export default class RandomQuote extends SlashCommand {
	constructor(manager: CommandManager) {
		super(manager, {
			name: 'randomquote',
			description: 'Get a random quote!',
		})
	}

	async run(int: Interaction) {
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
		const message = await (channel as TextChannel).send(msg)
		await int.respond({
			content: 'Here is the quote!',
		})
	}
}

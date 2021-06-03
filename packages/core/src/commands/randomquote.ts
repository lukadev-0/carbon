import { createCanvas, registerFont } from 'canvas'
import {
    MessageAttachment,
} from 'discord.js'
import { join } from 'path'
import BaseCommand from '../others/BaseCommand'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const quote = require('quote.js') // done because of the lack of typings

registerFont(join(process.cwd(), 'src', 'assets', 'font.ttf'), {
    family: 'Old Standard TT',
})

export default new BaseCommand({
    name: 'randomquote',
    description: 'Get a random quote',
    module: 'others_randomquote',
    run: async function(int) {
        const randomQuote = quote(1, { authorIsKnown: true })
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
            canvas.width - 5,
        )
        ctx.fillText(
            `-${randomQuote[0].a}`,
            canvas.width / 1.4,
            canvas.height / 1.8,
            canvas.width / 1.4,
        )
        int.editReply("Here's the quote!")
        int.webhook.send(new MessageAttachment(canvas.toBuffer()))
    },
} )

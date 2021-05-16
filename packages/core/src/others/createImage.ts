import { createCanvas, registerFont, loadImage } from 'canvas'
import { GuildMember, MessageAttachment } from 'discord.js'

registerFont(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('path').join(process.cwd(), 'src/assets/Roboto-Bold.ttf'),
    {
        family: 'Roboto',
    }
)

export default async function createWelcomeImage(
    member: GuildMember,
    welcome = true
): Promise<MessageAttachment> {
    const { displayName, guild, user } = member
    const text = welcome
        ? `Welcome to ${guild.name}!\n\n` +
          'We hope you will have a great\n' +
          'experience here and meet lots of\n' +
          'other programmers'
        : `Goodbye!\n` + 'Hope to see you again\n' + 'here!'

    const userAvatarImage = await loadImage(
        user.displayAvatarURL({ format: 'png', size: 4096 })
    )

    const canvas = createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')

    const gradient = ctx.createRadialGradient(
        0,
        canvas.height,
        0,
        0,
        canvas.height,
        350
    )

    gradient.addColorStop(0, '#220000')
    gradient.addColorStop(0.8, '#000000')
    gradient.addColorStop(0.98, '#000000')
    gradient.addColorStop(0.99, '#550000')
    gradient.addColorStop(1, '#000000')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(canvas.height / 2 - 50, canvas.height / 2, 150, 0, Math.PI * 2)
    ctx.save()

    ctx.clip()

    const s = canvas.height / 2 - 150
    ctx.drawImage(userAvatarImage, s - 50, s, 150 * 2, 150 * 2)

    ctx.restore()

    const x = canvas.height - 100

    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.font = '60px Roboto'
    ctx.fillText(displayName, x, s, 500)
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.lineTo(x - 5, s + 72)
    ctx.lineTo(canvas.width - s + 55, s + 72)
    ctx.stroke()
    ctx.font = '30px Roboto'
    ctx.fillText(text, x, s + 78, canvas.width)

    return new MessageAttachment(canvas.toBuffer('image/png'))
}

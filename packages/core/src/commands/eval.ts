import { ApplicationCommandData, CommandInteraction, Util } from 'discord.js'
import { inspect } from 'util'

export default {
    name: 'eval',
    description: 'Run code',
    defaultPermission: false,
    module: 'others_eval',
    options: [
        {
            name: 'code',
            description: 'Code to run',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    try {
        const evaled = inspect(eval(int.options[0].value as string)).replace(
            process.env.TOKEN!,
            '--removed--',
        )

        await int.editReply('Successfully ran!')
        for (const msg of Util.splitMessage(evaled, { maxLength: 1000 })) {
            await int.webhook.send(msg, { code: 'js' })
        }
    } catch (e) {
        await int.editReply('An error has occured')
        const error = inspect(
            (e.message as string).replace('`', '`' + String.fromCharCode(8203)),
        ).replace(process.env.TOKEN!, '--removed--')
        for (const msg of Util.splitMessage(error, { maxLength: 1000 })) {
            await int.webhook.send(msg, { code: 'js' })
        }
    }
}

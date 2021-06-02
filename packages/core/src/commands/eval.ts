import { Util } from 'discord.js'
import { inspect } from 'util'
import BaseCommand from '../others/BaseCommand'

export default new BaseCommand(
    {
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
        run: async function(int) {
            const evaled = inspect(eval(int.options[0].value as string)).replace(
                    process.env.TOKEN!,
                    '--removed--',
            )
        
            await int.editReply('Successfully ran!')
            for (const msg of Util.splitMessage(evaled, { maxLength: 1000 })) {
                await int.webhook.send(msg, { code: 'js' })
            }
        },
    },
)
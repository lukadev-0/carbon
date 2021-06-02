import owofire from 'owofire'
import { error as CarbonErrorEmoji } from '../constants/emojis'
import { isBad } from '../filter'
import BaseCommand from '../others/BaseCommand'

export default new BaseCommand(
    {
        name: 'owofy',
        description: 'OwOfy your text',
        module: 'others_owofy',
        options: [
            {
                name: 'text',
                description: 'Text to OwOfy',
                type: 'STRING',
                required: true,
            },
        ],
        run: async function(int) {
            const content = int.options[0].value as string
            if (await isBad(content))
                return int.editReply(`${CarbonErrorEmoji} Your message has been filtered`)
            const owofied = owofire(content)
            int.editReply(owofied, {
                allowedMentions: {
                    parse: [],
                },
            })
        }
        ,
    },
)
import { ApplicationCommandData, CommandInteraction } from 'discord.js'
import owofire from 'owofire'
import { isBad } from '../filter'

export default {
    name: 'owofy',
    description: 'OwOfy your text',
    options: [
        {
            name: 'text',
            description: 'Text to OwOfy',
            type: 'STRING',
            required: true,
        },
    ],
} as ApplicationCommandData

export async function run(int: CommandInteraction) {
    const content = int.options[0].value as string
    if (await isBad(content))
        return int.editReply(':x: Your message has been filtered')
    const owofied = owofire(content)
    int.editReply(owofied, {
        allowedMentions: {
            parse: [],
        },
    })
}
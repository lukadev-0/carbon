import { MessageEmbed, Message, TextChannel } from 'discord.js'
import { client } from '../client'
import variables from '../variables'
const { CHAT_HISTORY } = variables

// function to shorten messages so that they fit in the limit
function truncate(string: string, length: number) {
    return string.length > length ? string.slice(0, length - 3) + '...' : string
}

export async function chatHistory(message: Message, newMsg?: Message): Promise<void> {
    const logs = (await client.channels.fetch(CHAT_HISTORY)) as TextChannel

    const embed = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096,
            }),
        )
        .setTitle(message.deleted ? 'Message deleted' : 'Message edited')
        .setColor('GREEN')
        .addFields([
            {
                name: 'Sender',
                value: message.author,
            },
            {
                name: newMsg ? 'From' : 'Content',
                value: truncate(message.content, 1024),
            },
            ...(newMsg
                ? [
                    {
                        // Only add this field if newMsg is defined
                        name: 'To',
                        value: truncate(newMsg.content, 1024),
                    },
                ]
                : []),
            {
                name: 'Message Link',
                value: message.url,
            },
        ])

    logs.send(embed)
}

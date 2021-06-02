import { MessageEmbed } from 'discord.js'
import { error as CarbonErrorEmoji } from '../constants/emojis'

function truncate(string: string, length: number) {
    return string.length > length ? string.slice(0, length - 3) + '...' : string
}

export default (error: string): MessageEmbed => {
    return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`${CarbonErrorEmoji} An error has occured`)
        .addField('Error', truncate(error, 1024))
        .setDescription('Please send the error at LINK_HERE_NOW in order to get it fixed!')
}
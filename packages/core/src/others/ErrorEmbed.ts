import { MessageEmbed } from 'discord.js'

export default (error: string): MessageEmbed => {
    return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('An error has occured')
        .addField('Error', error)
        .setDescription('Please report it at LINK+HERE_PLZZZ')
}
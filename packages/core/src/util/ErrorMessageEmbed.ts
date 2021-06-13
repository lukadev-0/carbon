import * as discord from 'discord.js'
import { CarbonError } from './CarbonError'

/**
 * Represents a Carbon Error Message Embed
 */
export class ErrorMessageEmbed extends discord.MessageEmbed {
    constructor(public error: Error) {
        super()

        this
            .setTitle(`Error: ${error.name}`)
            .setColor(0xff0000)
            .setDescription('An unexpected error has occurred')
            .addField('Error', '```\n' + error.message + '\n```')

        if (error instanceof CarbonError) {
            this.setFooter(error.code)
        }
    }
}
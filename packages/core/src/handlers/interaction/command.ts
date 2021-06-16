import { Command } from '../../structures/Command'
import { CommandInteraction } from 'discord.js'
import { ErrorMessageEmbed } from '../../util/ErrorMessageEmbed'
import { CarbonError, CarbonErrorType } from '../../util/CarbonError'

// temporary, will be replaced with import from interactions
const commands: Record<string, Command> = {}

export function handleCommandInteraction(interaction: CommandInteraction): void {
    try {
        const command = commands[interaction.commandName]

        if (!command) {
            throw new CarbonError(CarbonErrorType.CommandNotFound)
        }
    } catch(e) {
        const embed = new ErrorMessageEmbed(e)

        const shouldEdit = interaction.replied || interaction.deferred

        ;(shouldEdit ? interaction.editReply : interaction.reply)(embed)
    }
}
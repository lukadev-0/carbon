import { Interaction } from 'discord.js'
import { handleCommandInteraction } from './command'

export function handleInteraction(interaction: Interaction): void {
    if (interaction.isCommand()) return handleCommandInteraction(interaction)
}
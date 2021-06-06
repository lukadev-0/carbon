import { Interaction } from 'discord.js'
import { handleCommandInteraction } from './command'

export function handleInteraction(interaction: Interaction) {
  if (interaction.isCommand()) return handleCommandInteraction(interaction)
}
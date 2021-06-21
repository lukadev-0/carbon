import { Interaction } from 'discord.js'
import { Client as CarbonClient, CarbonError, CarbonErrorType } from '@carbon-js/core'

export async function interactionHandler(int: Interaction): Promise<void> {
    if (!int.isCommand()) return

    const command = (int.client as CarbonClient).interactions.find((v) => v.name === int.commandName)
    if (!command) throw new CarbonError(CarbonErrorType.CommandNotFound, `${int.commandName} wasn't found!`)
    command.run(int)
}
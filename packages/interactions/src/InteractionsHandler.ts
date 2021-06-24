import { Client, Interaction } from 'discord.js'
import { CarbonError, CarbonErrorType } from './util/CarbonError'
import { Command } from '.'

interface CarbonClient extends Client {
    interactions: Command[]
}

export async function InteractionHandler(int: Interaction): Promise<void> {
    if (!int.isCommand()) return
    const command = (int.client as CarbonClient).interactions.find((v) => v.name === int.commandName)
    if (!command) throw new CarbonError(CarbonErrorType.CommandNotFound, `${int.commandName} wasn't found!`)
    command.run(int)
}
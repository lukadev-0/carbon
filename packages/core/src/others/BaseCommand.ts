import { ApplicationCommandData, CommandInteraction } from 'discord.js'

interface CarbonCommandData extends ApplicationCommandData {
    module: string
}

type Run = (int: CommandInteraction) => Promise<void>

export default class BaseCommand {
    constructor(public options: CarbonCommandData, public run: Run) {}
}

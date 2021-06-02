import { ApplicationCommandData, CommandInteraction } from 'discord.js'

export interface CarbonCommandData extends ApplicationCommandData {
    module: string
    run: Run
}

export interface CarbonInteraction extends CommandInteraction {
    moduleData: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (int: CarbonInteraction) => Promise<any>

export default class BaseCommand {
    constructor(public options: CarbonCommandData) {}
}

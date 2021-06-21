import * as discord from 'discord.js'

/**
 * Represents a Carbon Slash Command
 */
export class Command {
    /**
     * @param data Raw Slash Command Data
     */
    constructor(data: ApplicationCommandData) {
        this.name = data.name
        this.description = data.description
        this.options = data.options
        this.defaultPermission = data.defaultPermission
        this.module = data.module

        this.run = data.run ?? (() => {
            throw new Error(`Command '${this.name}' does not have a 'run' method`)
        })
    }
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Command extends ApplicationCommandData {}

export interface ApplicationCommandData extends discord.ApplicationCommandData {
    run: (interaction: discord.CommandInteraction) => void
    module: string
}
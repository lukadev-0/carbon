import * as discord from 'discord.js'

interface ApplicationCommandData extends discord.ApplicationCommandData {
    module: string
}

export class Command {
    constructor(data: ApplicationCommandData) {
        this.name = data.name
        this.description = data.description
        this.options = data.options
        this.defaultPermission = data.defaultPermission
        this.module = data.module

        this.run = () => {
            throw new Error(`Command '${this.name}' does not have a 'run' method`)
        }
    }
}

export interface Command {
    run: (interaction: discord.CommandInteraction) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Command extends ApplicationCommandData {}

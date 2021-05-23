import { ApplicationCommandData, Interaction } from 'discord.js'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { CarbonClient } from '../client'

interface CommandModule extends ApplicationCommandData {
    run: (interaction: Interaction) => void
}

type Commands = Record<string, CommandModule>

const commands: Commands = {}

const commandsDir = join(__dirname, 'commands')

export async function createSlashCommands(client: CarbonClient): Promise<void> {
    client.on('interaction', async (interaction) => {
        if (!interaction.isCommand()) return
        await interaction.defer(false)
        commands[interaction.commandName].run(interaction)
    })

    const commandModules = await readdir(commandsDir)

    for (const name of commandModules) {
        const module = await import(join(commandsDir, name))

        commands[module.default.name] = {
            ...module.default,
            ...module,
        }
    }

    await client.application?.commands.set(
        Object.values(commands).map((command) => ({
            name: command.name,
            description: command.description,
            options: command.options,
            defaultPermission: true,
        }))
    )
}

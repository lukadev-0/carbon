import { ApplicationCommandData, CommandInteraction } from 'discord.js'
import { promises } from 'fs'
import { join } from 'path'
import { client } from '../client'
import variables from '../variables'
interface CommandFunctions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key: string]: Function
}
const commandFunctions: CommandFunctions = {}
const ownerOnly: string[] = ['eval', 'respondtosuggestion']
const { readdir } = promises

const commandsLocation = join(__dirname, '../commands')

;(async () => {
    const commands = await readdir(commandsLocation)
    const allCommands = []
    for (const c of commands) {
        const imported = await import(join(commandsLocation, c))
        commandFunctions[imported.default.name] = imported.run
        allCommands.push(imported.default)
    }
    const setCommands = await (
        await client.guilds.fetch(variables.GUILD)
    ).commands.set(allCommands)
    for (const p of ownerOnly) {
        await setCommands
            .find((c: ApplicationCommandData) => c.name === p)
            ?.setPermissions([
                {
                    id: variables.OWNER_ID,
                    type: 'USER',
                    permission: true,
                },
            ])
    }
})()

client.on('interaction', async (interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return
    await interaction.defer(false)
    commandFunctions[interaction.commandName](interaction)
})

import { MessageEmbed, ApplicationCommandData, Interaction } from 'discord.js'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { CarbonClient } from '../client'
import { emojis } from '../constants/emojis'

class CarbonInteraction extends Interaction {
    moduleData: unknown
}
interface CommandModule extends ApplicationCommandData {
    run: (interaction: CarbonInteraction) => void
    module: string
}

type Commands = Record<string, CommandModule>

const commands: Commands = {}

const commandsDir = join(__dirname, 'commands')

export async function createSlashCommands(client: CarbonClient): Promise<void> {
    client.on('interaction', async (interaction) => {
        if (!interaction.isCommand()) return
        if (!interaction.guild)
            return interaction.reply(
                new MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`${emojis.error} No DM's`)
                    .setDescription("Carbon can't be used in DM's."),
            )

        await interaction.defer({
            ephemeral: false,
        })

        const command = commands[interaction.commandName]
        const moduleData = await interaction.guild.config.get(command.module)

        if (!moduleData)
            return interaction.reply(
                new MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`${emojis.error} Not enabled`)
                    .setDescription('This command is not enabled.'),
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(interaction as any).moduleData = moduleData

        commands[interaction.commandName].run(
            interaction as unknown as CarbonInteraction,
        )
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

import { MessageEmbed, GuildMember, CommandInteraction, Client, MessageComponentInteraction } from 'discord.js'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { error as CarbonErrorEmoji } from '../constants/emojis'
import BaseCommand, { CarbonInteraction } from './BaseCommand'
import ErrorEmbed from './ErrorEmbed'

type Commands = Record<string, BaseCommand>

const commands: Commands = {}

const commandsDir = join(__dirname, '..', 'commands')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isCarbonInteraction(int: CommandInteraction | MessageComponentInteraction): int is CarbonInteraction {
    return true
}

export async function createSlashCommands(client: Client): Promise<void> {
    client.on('interaction', async (interaction) => {
        if (!interaction.isCommand()) return

        await interaction.defer({
            ephemeral: false,
        })

        if (!isCarbonInteraction(interaction)) return
        if (!interaction.guild)
            return interaction.reply(
                new MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`${CarbonErrorEmoji} No DM's`)
                    .setDescription("Carbon can't be used in DM's."),
            )

        const command = commands[interaction.commandName].options
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /*const moduleData = await interaction.guild.config.get(command.module)

        if (!moduleData)
            return interaction.reply(
                new MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`${CarbonErrorEmoji} Not enabled`)
                    .setDescription('This command is not enabled.'),
            )

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        interaction.moduleData = moduleData*/

        if (!(interaction.member instanceof GuildMember)) {
            interaction.editReply(ErrorEmbed('Couldn\'t get the guild member.'))
            return
        }
        try {
            await command.run(
                interaction,
            )
            return
        }
        
        catch (e) {
            interaction.editReply(
                ErrorEmbed(`${e.message}\n${e.stack}` || "Couldn't get the error message"),
            )
            return
        }
    })

    const commandModules = await readdir(commandsDir)

    for (const name of commandModules) {
        const module = await import(join(commandsDir, name))

        commands[module.default.options.name] = {
            ...module.default,
        }
    }

    await client.application?.commands.set(
        Object.values(commands).map((command) => ({
            name: command.options.name,
            description: command.options.description,
            options: command.options.options,
            defaultPermission: command.options.defaultPermission ?? true,
        }))
    )
}

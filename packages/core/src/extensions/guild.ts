import { GuildCreateOptions, Structures } from 'discord.js'
import { CarbonClient } from '../client'

Structures.extend(
    'Guild',
    (Guild) =>
        class CarbonGuild extends Guild {
            constructor(client: CarbonClient, data: GuildCreateOptions) {
                super(client, data)
            }
        },
)

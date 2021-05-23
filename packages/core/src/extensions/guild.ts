import { Structures } from 'discord.js'
import { CarbonClient } from '../client'
import { GuildConfig } from '../others/GuildConfig'

declare module 'discord.js' {
    interface Guild {
        config: GuildConfig
        client: CarbonClient
    }
}

Structures.extend(
    'Guild',
    (Guild) =>
        class CarbonGuild extends Guild {
            config: GuildConfig = new GuildConfig(this)
        },
)

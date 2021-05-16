import { Structures } from 'discord.js'
import { CarbonClient } from '../client'

Structures.extend(
    'Guild',
    (Guild) =>
        class CarbonGuild extends Guild {
            constructor(client: CarbonClient, data: any) {
                super(client, data)
            }
        }
)

import * as discord from 'discord.js'
import { Client } from '@carbon-js/core'

type Obj = Record<string, unknown>

const snowflake = discord.SnowflakeUtil.generate

const withId = (obj: Obj) => ({
    id: snowflake(),
    ...obj,
})

export class MockClient extends Client {
    constructor() {
        super({
            intents: [],
        })
    }
}

export abstract class Managed<
    T extends discord.Base & { id: discord.Snowflake },
    Manager extends discord.BaseManager<discord.Snowflake, T, never>
> {
    constructor(private manager: Manager) {}

    mock!: T

    cache(): this {
        this.manager.cache.set(this.mock.id, this.mock)
        return this
    }
}

export class MockUser extends Managed<discord.User, discord.UserManager> {
    constructor(client: MockClient, data: Obj) {
        super(client.users)

        this.mock = new discord.User(client, withId({
            username: 'Mock',
            discriminator: '0000',
            avatar: null,
            bot: false,
            system: false,
            mfa_enabled: false,
            locale: 'en-US',
            verified: true,
            email: 'mock@example.com',
            ...data,
        }))
    }
}

export class MockGuild extends Managed<discord.Guild, discord.GuildManager> {
    constructor(client: MockClient, data: Obj) {
        super(client.guilds)

        this.mock = new discord.Guild(client, withId({
            name: 'Mock',
            icon: null,
            splash: null,
            discovery_splash: null,
            owner_id: snowflake(),
            region: 'us-west',
            afk_channel_id: null,
            ...data,
        }))
    }
}
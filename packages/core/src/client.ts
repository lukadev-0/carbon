import * as discord from 'discord.js'
import { handleInteraction } from './handlers/interaction'

export class Client extends discord.Client {
    constructor(options: discord.ClientOptions) {
        super(options)

        this.on('interaction', handleInteraction)
    }

    /**
     * Creates a mock client
     * @internal
     */
    static _mock(options?: Partial<discord.ClientOptions>): Client {
        return new this({
            intents: [],
            ...options,
        })
    }
}
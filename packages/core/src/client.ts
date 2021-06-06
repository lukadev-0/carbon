import * as discord from 'discord.js'
import { handleInteraction } from './handlers/interaction'

export class Client extends discord.Client {
    constructor(options: discord.ClientOptions) {
        super(options)

        this.on('interaction', handleInteraction)
    }
}
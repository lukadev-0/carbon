//import './others/server' // Web server

import { TextChannel, Message, User } from 'discord.js'
import { client } from './client'
import { filter } from './filter'
import createImage from './others/createImage'
import { handleMessage as handleHelpMessage } from './others/handleHelpChannels'
import { handleReaction } from './others/reactionRoles'
import { chatHistory } from './others/chatHistory'
import variables from './variables'
import { createSlashCommands } from './others/slashCreator'

client.on('ready', async () => {
    await import('./others/slashCreator')
    await import('./extensions/guild')

    console.log(`Logged in as ${client.user!.tag}`)

    client.user!.setActivity(variables.BOT_STATUS, {
        type: variables.BOT_STATUS_TYPE,
    })

    const reactionRoleChannel = (await client.channels.fetch(
        variables.REACTION_ROLE_CHANNEL,
    )) as TextChannel

    reactionRoleChannel.messages.fetch()

    createSlashCommands(client)
})

client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return

    handleReaction(reaction, user as User, 'add')
})

client.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return

    handleReaction(reaction, user as User, 'delete')
})

client.on('guildMemberAdd', (member) => {
    client.channels
        .fetch(variables.WELCOME_CHANNEL)
        .then(async (channel) =>
            (channel as TextChannel).send(await createImage(member)),
        )
})

client.on('guildMemberRemove', (partial) => {
    client.channels
        .fetch(variables.GOODBYE_CHANNEL)
        .then(async (channel) =>
            (channel as TextChannel).send(
                await createImage(partial, false),
            ),
        )
})

client.on('message', async (message) => {
    if (message.author.bot) return

    await filter(message)

    handleHelpMessage(message)
})

client.on('messageUpdate', async (message, messageNew) => {
    if (message.author?.bot) return

    await filter(messageNew as Message)

    if (message.content !== messageNew.content) {
        chatHistory(message as Message, messageNew as Message)
    }
})

client.on('messageDelete', (message) => {
    if (message.author?.bot) return

    chatHistory(message as Message)
})

client.login(process.env.TOKEN!)

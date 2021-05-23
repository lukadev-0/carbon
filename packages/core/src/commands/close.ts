import {
    ApplicationCommandData,
    CommandInteraction,
    GuildMember,
} from 'discord.js'
import { closeSession, sessions } from '../others/handleHelpChannels'
import overrideRegex from '../others/overrideRegex'

export default {
    name: 'close',
    description: 'Close your help channel',
    module: 'help',
} as ApplicationCommandData

export async function run(int: CommandInteraction): Promise<void> {
    const member = int.member as GuildMember
    const session = sessions.get(int.channelID as string)

    if (!session)
        return int.editReply(
            'Failed to get the session, are you sure this is a help channel?',
        )

    if (
        session?.initMessage.member!.user.id === member.id ||
        member.roles.cache.some((v) => Boolean(v.name.match(overrideRegex)))
    ) {
        await closeSession(session!)

        return int.editReply(':white_check_mark: Channel closed')
    }

    return int.editReply(
        ':x: Failed to close channel. You can only close help channels that you own.',
    )
}

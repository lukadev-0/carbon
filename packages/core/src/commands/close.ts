import { GuildMember, Snowflake } from 'discord.js'
import { error as CarbonErrorEmoji } from '../constants/emojis'
import BaseCommand from '../others/BaseCommand'
import { closeSession, sessions } from '../others/handleHelpChannels'
import overrideRegex from '../others/overrideRegex'

export default new BaseCommand({
    name: 'close',
    description: 'Close your help channel',
    module: 'help',
    run: async function(int) {
        const member = int.member as GuildMember // Command handler ensures it isn't non GuildMember
        const session = sessions.get(int.channelID as Snowflake)
    
        if (!session)
            return int.editReply(
                `${CarbonErrorEmoji} Failed to get the session, are you sure this is a help channel?`,
            )
    
        if (
            session?.initMessage.member!.user.id === member.id ||
            member.roles.cache.some((v) => Boolean(v.name.match(overrideRegex)))
        ) {
            await closeSession(session!)
    
            return int.editReply(':white_check_mark: Channel closed')
        }
    
        return int.editReply(
            `${CarbonErrorEmoji} Failed to close channel. You can only close help channels that you own.`,
        )
    },
})
// import { CarbonError, CarbonErrorType } from '@carbon-js/core'
// import { User } from 'discord.js'
import { Command } from '@carbon-js/core'

/**
 * The default commands for Carbon
 * @returns The commands
 * @public
 */

export function defaults(/* ephemeral = true */): Command[] {
    return [
        // new Command({
        //     name: 'avatar',
        //     description: 'Get someone\'s avatar',
        //     module: 'misc',
        //     options: [
        //         {
        //             name: 'user',
        //             description: 'The user to get avatar of',
        //             required: false,
        //             type: 'USER',
        //         },
        //     ],
        //     run: async (int) => {
        //         await int.defer({
        //             ephemeral,
        //         })
        //         const user = int.options.get('user')?.user || int.member?.user
        //         if (!user) return int.editReply(new CarbonError(CarbonErrorType.CommandError, "Couldn't get a user!").embed())
        //         if (!(user instanceof User)) await int.client.users.fetch(user.id)
        //         int.editReply((user as User).displayAvatarURL({
        //             dynamic: true,
        //             format: 'png',
        //             size: 4096,
        //         }))
        //     },
        // }),
        // new Command({
        //     name: 'music',
        //     description: 'Music commands',
        //     module: 'misc',
        //     options: [
        //         {
        //             name: 'play',
        //             description: 'Play music',
        //             type: 'SUB_COMMAND',
        //             options: [
        //                 {
        //                     name: 'song',
        //                     description: 'Name of the song to play',
        //                     required: true,
        //                     type: 'STRING',
        //                 },
        //             ],
        //         },
        //         {
        //             name: 'options',
        //             description: 'Get the music options',
        //             type: 'SUB_COMMAND',
        //         },
        //     ],
        //     run: async (int) => {
        //         await int.defer({
        //             ephemeral,
        //         })
        //         console.log(int.options)
        //     },
        // }),
    ]
}
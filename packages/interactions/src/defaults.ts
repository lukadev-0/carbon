import { CarbonError, CarbonErrorType } from '@carbon-js/core'
import { User } from 'discord.js'
import { Command } from '.'

export function defaults(ephemeral = true): Command[] {
    return [
        new Command({
            name: 'avatar',
            description: 'Get someone\'s avatar',
            module: 'misc',
            options: [
                {
                    name: 'user',
                    description: 'The user to get avatar of',
                    required: false,
                    type: 'USER',
                },
            ],
            run: async (int) => {
                int.defer({
                    ephemeral,
                })
                const user = int.options.get('user')?.user || int.member?.user
                if (!user) return int.editReply(new CarbonError(CarbonErrorType.CommandError, "Couldn't get a user!").embed())
                if (!(user instanceof User)) await int.client.users.fetch(user.id)
                int.editReply((user as User).displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                    size: 4096,
                }))
            },
        }),
    ]
}
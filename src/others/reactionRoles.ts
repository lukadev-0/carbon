import { MessageReaction, User } from "discord.js"

const roleIds = {
	'😎': '810641538585067520'
}

export async function handleReaction(
	reaction: MessageReaction,
	user: User,
	action: 'add' | 'delete'
) {
	const {
		message: { guild, channel },
		emoji,
	} = reaction

	if (channel.id !== process.env.REACTION_ROLE_CHANNEL) return
	if (!guild) return

	const { roles } = await guild.members.fetch(user.id)

	const role = roleIds[emoji.name as keyof typeof roleIds]

	if (!role) return

	try {
		switch (action) {
			case 'add':
				return await roles.add(role)
			case 'delete':
				return await roles.remove(role)
		}
	} catch (e) {
		console.error(e)
	}
}

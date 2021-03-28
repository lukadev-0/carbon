const DISALLOWED_DOMAINS = [
	'discord.gg',
	'discord.io',
	'discord.me',
	'discord.li',
	'discord.com/invite/',
	'discordapp.com/invite/',
	'invite.gg',
	'dis.gd',
	'twitter.com',
	'soundcloud.com',
	'snd.sc',
]

const regexes = DISALLOWED_DOMAINS.map(
	(domain) =>
		new RegExp(`(.+\\.)?${domain.replace('.', '\\.').replace('/', '\\/')}`, 'i')
)

module.exports = function hasLinks(message) {
	const {
		member: { roles },
		content,
	} = message
	if (
		roles.cache.some((role) =>
			role.name.toLowerCase().match(/moderator|owner/gi)
		)
	)
		return
	return regexes.some((regex) => content.replace(/\s/gi, '').match(regex))
}

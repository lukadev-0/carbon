const request = require('request-promise')

const WHITELIST = [
	'github.io',
	'cdn.discord.com',
	'cdn.discordapp.com',
	'daimond113.com',
	'youtube.com',
	'imgur.com',
	'tenor.com',
	'roblox.com',
	'reactjs.org',
	'create-react-app.dev',
	'nextjs.org',
	'expressjs.org',
	'nodejs.org',
	'deno.land',
	'npmjs.com',
	'github.com',
	'material-ui.com',
	'typescriptlang.org',
	'vercel.app',
	'bit.ly',
]

const BLACKLIST = [
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
].map(
	(domain) =>
		new RegExp(`(.+\\.)?${domain.replace('.', '\\.').replace('/', '\\/')}`, 'i')
)

module.exports = async function hasLinks(content) {
	const testStr = content.replace(/\s+/g, '') // Using "+" is more performant
	if (BLACKLIST.some((regex) => regex.test(testStr))) return true
	const urls = content.match(/(https?:\/\/\S+)/gi)
	if (urls) {
		for (const url of urls) {
			const response = await request(url, {
				maxRedirects: Infinity,
				resolveWithFullResponse: true,
			})
			const matched = !WHITELIST.some((wlUrl) => {
				return response.request.uri.href.includes(wlUrl)
			})
			if (matched) return true
		}
	}
	return false
}

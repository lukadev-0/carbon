const WHITELIST = [
	"github.io",
  "daimond113.com",
  "youtube.com",
  "imgur.com",
  "tenor.com",
  "roblox.com",
  "reactjs.org",
  "create-react-app.dev",
  "nextjs.org",
  "expressjs.org",
  "nodejs.org",
  "deno.land",
  "npmjs.com",
  "github.com",
  "material-ui.com",
  "typescriptlang.org"
];

const BLACKLIST = [
	"discord.gg",
	"discord.io",
	"discord.me",
	"discord.li",
	"discord.com/invite/",
	"discordapp.com/invite/",
	"invite.gg",
	"dis.gd",
	"twitter.com",
	"soundcloud.com",
	"snd.sc",
];

const regexes = BLACKLIST.map(domain =>
	new RegExp(`(.+\\.)?${domain.replace(".", "\\.").replace("/", "\\/")}`, "i")
);

module.exports = function hasLinks(message) {
	const { member: { roles }, content } = message;
	if (roles.cache.some(role => role.name.match(/moderator|owner/gi))) 
		return false;
	if (regexes.some(regex => regex.test(content.replace(/\s/g, ""))))
		return true;
	const urls = content.match(/(https?:\/\/[^\s]+)/gi);
	if (urls)
		return !urls.every(url => WHITELIST.includes(new URL(url).hostname));
}

import axios from 'axios'

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

export async function hasLinks(content: string) {
    const urls = content.match(/(https?:\/\/\S+)/gi)

    if (urls) {
        for (const url of urls) {
            const response = await axios.head(url, {
                maxRedirects: Infinity,
                timeout: 5000,
            })

            const matched = !WHITELIST.some((wlUrl) =>
                new RegExp(`.?${wlUrl}$`).test(
                    response.request.host.toLowerCase()
                )
            )
            if (matched) return true
        }
    }

    return false
}

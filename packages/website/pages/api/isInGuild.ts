import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch-retry'

export interface Guild {
    id: string
    name: string
    icon: string
    owner: boolean
    permissions: string
    features: string[]
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'GET') return res.status(405).end()
    const { guildId } = req.query
    if (!guildId || Array.isArray(guildId)) return res.status(400).end()
    const response = await fetch(`https://discord.com/api/v8/users/@me/guilds?after=${parseInt(guildId) - 1}&limit=1`, {
        headers: {
            'Authorization': `Bot ${process.env.BOT_TOKEN}`,
        },
        retry: 10,
        callback: (retry) => {console.log(`Trying: ${retry}`)},
    })

    if (!response.ok) {
        return res.status(500).json({
            message: 'failed to fetch guilds from Discord API',
        })
    }

    const guilds: Guild[] = await response.json()
    const isIn = guilds.find((v) => v.id === guildId)
    res.send(isIn ? true : false)
}
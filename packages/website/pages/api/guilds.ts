import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import fetch from 'node-fetch-retry'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'GET') return res.status(405).end()

    const session = await getSession({ req })

    if (!session?.accessToken) {
        return res.status(401).end()
    }

    const response = await fetch('https://discord.com/api/v8/users/@me/guilds', {
        headers: {
            'Authorization': `Bearer ${session.accessToken}`,
        },
        retry: 10,
        pause: 1000,
    })

    if (!response.ok) {
        return res.status(500).json({
            message: 'failed to fetch guilds from Discord API',
        })
    }

    const guilds = await response.json()

    res.json(guilds)
}
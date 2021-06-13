import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Discord({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            scope: 'identify email guilds',
        }),
    ],
})
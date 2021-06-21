import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

declare module 'next-auth' {
    interface Session {
        user: {
            discriminator: string,
            name: string,
            image: string,
        },
        accessToken: string
    }
}

export default NextAuth({
    providers: [
        Providers.Discord({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            scope: 'identify guilds',
        }),
    ],
    callbacks: {
        async jwt(token, _user, account, profile) {
            if (profile?.discriminator) {
                token.discriminator = profile.discriminator
            }

            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }

            return token
        },
        async session(session, token) {
            session.user.discriminator = token.discriminator as string
            session.accessToken = token.accessToken as string

            return session
        },
    },
})
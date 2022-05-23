import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { getUserGuildInfo, URL } from "../../../lib/DiscordApi"

async function refreshAccessToken(token: any) {}

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, account, user, profile }) {
      let userGuildInfo = null
      if (account && token) {
        userGuildInfo = await getUserGuildInfo(
          token.accessToken as string,
          token.sub as string,
          true
        )
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.userId,
          userGuildInfo: userGuildInfo,
          expiresAt: Date.now() + (account.expires_at as number),
        }
      }

      if (token) {
        userGuildInfo = await getUserGuildInfo(
          token.accessToken as string,
          token.sub as string
        )
      }

      if (
        token.expiresAt == null ||
        (token.expiresAt as number) <= Date.now()
      ) {
        console.log(
          "SHOULD REFRESH ACCESS TOKEN",
          token,
          token.expiresAt,
          Date.now()
        )
      }
      return {
        ...token,
        userGuildInfo: userGuildInfo,
      }
    },

    async session({ session, user, token }) {
      return {
        ...session,
        token: token,
      }
    },
  },
})

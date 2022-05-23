import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { getUserGuildInfo, URL } from "../../../lib/DiscordApi"

async function refreshAccessToken(token: any) {}

//1653405665225
export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
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
      //TOKEN: https://i.thimo.dev/62718c3a65c6e8c62298540f
      //1652213800
      //1653753267364

      // console.log("token jwt", token)
      // console.log("hasAccount", account != null)

      if (account && token) {
        userGuildInfo = await getUserGuildInfo(
          token.accessToken as string,
          token.sub as string,
          true
        )

        // if (userGuildInfo == null) {
        //   console.log(1)
        //   throw new Error('Blocked user.')
        // }

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
      console.log(1)
      return {
        ...token,
        userGuildInfo: userGuildInfo,
      }
    },

    async session({ session, user, token }) {
      // console.log("session", session)
      // console.log("token", token)
      // console.log("user", user)
      return {
        ...session,
        token: token,
      }
    },
  },
})

import { User } from "next-auth"
import axios from "axios"
import nodeCache from "node-cache"

const scopes = ["identify", "email", "guilds"].join("%20")
const clientId = "793090362457063444"
export const mainGuildId = "905833685977272371"
export const staffGuildId = "590249947803418624"
const API_ENDPOINT = "https://discord.com/api/v8"
// const redirectUri =

const userGuildData = new nodeCache({ stdTTL: 120, checkperiod: 30 })

interface GuildUserInfo {
  roles: Array<string>
  nick: string | null
  avatar: string | null
  premium_since: string | Date
  joined_at: Date
  is_pending: boolean
  pending: boolean
  communication_disabled_until: null | Date
  flags: number
  user: GuildUser
}

interface GuildUser {
  id: string
  username: string
  avatar: null | string
  avatar_decoration: null | string
  discriminator: string
  public_flags: number
}

export const URL =
  API_ENDPOINT +
  "/oauth2/authorize?client_id=793090362457063444&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email%20guilds%20guilds.members.read"

export function refreshAccessToken(user: User, refreshToken: string) {
  const refreshUrl = API_ENDPOINT + "/oath2/token"

  const data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: (user as any).token.refreshToken,
  }

  axios.post(
    refreshUrl,
    {
      Headers: {
        "Content-Type": "application/json",
      },
    },
    {}
  )
}

export async function getUserGuildInfo(
  accessToken: string,
  userId: string,
  force: boolean = false
): Promise<GuildUserInfo | null> {
  // return null
  if (!accessToken) return null

  if (!force && userGuildData.has(userId)) {
    console.log("getting from cache")
    return userGuildData.get(userId) as GuildUserInfo
  }

  if (force) {
    console.log("forcing request...")
  }
  try {
    //https://discord.com/api/users/@me/guilds

    console.log(
      "Sending api request",
      `is in cache = ${userGuildData.has(userId)}`
    )
    const { data } = await axios.get(
      "https://discord.com/api/v8/users/@me/guilds/" + mainGuildId + "/member",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )

    // const userGuilds = data as Guild[]

    // guilds.set(userId, userGuilds)

    const guildUser = data as GuildUserInfo
    userGuildData.set(guildUser.user.id, guildUser)
    // console.log("data", data)

    if (guildUser) {
      return guildUser
    }

    return null
  } catch (error: Error | any) {
    // console.log("error!", error)
    console.log("discordapi error =>", error.message)
    return null
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {}

//https://discord.com/api/oauth2/authorize?client_id=793090362457063444&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fapi%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email%20guilds

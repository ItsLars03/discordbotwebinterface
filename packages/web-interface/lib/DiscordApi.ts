import { User } from "next-auth"
import axios from "axios"
import nodeCache from "node-cache"

if (!global.cachedRequests) {
  global.cachedRequests = {
    guildMemberRequest: {},
  }
} else if (!global.cachedRequests["guildMemberRequest"]) {
  global.cachedRequests["guildMemberRequest"] = {}
}

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

const MAX_TIME: number = 30 * 1000

export async function getUserGuildInfo(
  accessToken: string,
  userId: string,
  force: boolean = false
): Promise<GuildUserInfo | null> {
  // return null
  if (!accessToken) return null

  if (
    cachedRequests["guildMemberRequest"]?.firstRequest != null &&
    Date.now() - cachedRequests["guildMemberRequest"].firstRequest < MAX_TIME &&
    cachedRequests["guildMemberRequest"].data != null
  ) {
    return cachedRequests["guildMemberRequest"].data
  }

  if (
    cachedRequests["guildMemberRequest"].firstRequest != null &&
    Date.now() - cachedRequests["guildMemberRequest"].firstRequest < MAX_TIME &&
    cachedRequests["guildMemberRequest"].promise != null
  ) {
    console.log("Sending here!")

    try {
      const { data } = await cachedRequests["guildMemberRequest"].promise
      return data
    } catch (error) {
      return null
    }
  }

  console.log("sending request...", cachedRequests["guildMemberRequest"])

  try {
    //https://discord.com/api/users/@me/guilds
    if (
      cachedRequests["guildMemberRequest"].firstRequest == null ||
      cachedRequests["guildMemberRequest"].firstRequest >= MAX_TIME
    ) {
      cachedRequests["guildMemberRequest"].firstRequest = Date.now()
    }

    console.log(
      "Sending api request",
      `is in cache = ${userGuildData.has(userId)}`
    )

    cachedRequests["guildMemberRequest"].promise = axios.get(
      "https://discord.com/api/v8/users/@me/guilds/" + mainGuildId + "/member",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )

    const { data } = await cachedRequests["guildMemberRequest"].promise

    // console.log("data", data)

    if (data) {
      cachedRequests["guildMemberRequest"].data = data
    }

    // const userGuilds = data as Guild[]

    // guilds.set(userId, userGuilds)

    const guildUser = data as GuildUserInfo
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

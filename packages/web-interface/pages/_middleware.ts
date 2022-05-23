import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { getSession, useSession } from "next-auth/react"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export async function middleware(req: any) {
  if (
    !req.nextUrl.pathname.startsWith("/api") &&
    !req.nextUrl.pathname.startsWith("/auth")
  ) {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    })
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.

    // console.log("session", session)

    if (!session) return NextResponse.redirect(new URL("/auth/login", req.url))
    // If user is authenticated, continue.
  } else {
    NextResponse.next()
  }
}

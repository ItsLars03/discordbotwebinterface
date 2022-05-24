import mongoose from "mongoose"

export {}

declare global {
  var mongo: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
  var cachedRequests: {
    [key: string]: {
      data?: any
      promise?: Promise<any>
      firstRequest?: number
    }
  }
}

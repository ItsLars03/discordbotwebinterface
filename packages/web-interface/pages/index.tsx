import type { NextPage } from "next"
import { useSession } from "next-auth/react"

const Home: NextPage = () => {
  const { data } = useSession()
  // console.log(data != null)
  return (
    <>
      <div>Home Page</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default Home

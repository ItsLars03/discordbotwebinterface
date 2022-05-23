import { NextPage } from "next"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import discordBlueImage from "../../public/images/discordBlueLogo.png"

// const fetcher = async (url: string) => {
//   console.log(url)
//   const res = await fetch(url)
//   const data = await res.json()

//   console.log('Status', res.status)
//   if (res.status !== 200) {
//     throw new Error(data.message)
//   }
//   return data
// }

const LoginPage: NextPage = (props: any) => {
  const { data } = useSession()
  console.log(data != null)
  // const { data, error } = useSWR('/api/auth', fetcher)

  // if (error) return <h1>failed to load</h1>
  // if (!data) return <h1>loading...</h1>
  // return <h1>HI THERE! This is the login page! {data['name']}</h1>

  // console.log(props)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <Image className="mb-10 w-72" src={discordBlueImage} alt="" />

      {Object.values(props.providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#5865F2] p-5 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
          <button
            className="rounded-full bg-[#5865F2] p-5 text-white"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            logout with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}
//http://localhost:3000/api/auth/callback/spotify

export default LoginPage

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

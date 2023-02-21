import { FC, useEffect, useState } from "react"
import { useRouter } from 'next/router'


const User: FC = () => {
  const [data,setData] = useState<ProfileData>()

  const router = useRouter()
  const { username } = router.query
  console.log(username)

  useEffect(()=>{
    const getPlayerData = async () =>{
      const response = await fetch(`/api/profile/${username}`)
      const data = await response.json()
      setData(data)
      
        }
    getPlayerData()
  },[username])

  return (<>
    <div className="w-full  text-black">
      <h1 className="text-4xl font-bold m-2">Username : {data?.username}</h1>
      <h1 className="text-2xl m-2">Bio : {data?.bio}</h1>
      <h1 className="text-2xl m-2">Age: {data?.age}</h1>
      <h1 className="text-2xl m-2">Twitter :{data?.twitter}</h1>
      <h1 className="text-2xl m-2">Email :{data?.email}</h1>

    </div>
  </>)

}


export default User
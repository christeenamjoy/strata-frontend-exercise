import Link from "next/link"
import { FC, useEffect, useState } from "react"



const Leaderboard: FC = () => {

  const [leaderBoard,setLeaderBoard] =useState<UserDetails[]>([])

  useEffect(()=>{
const interval = setInterval(()=>{
  getData()
},20000)
getData()


return () =>{
  clearInterval(interval)
}
  },[])

  const getData = async () =>{
         const response = await fetch("/api/leaderboard")
         const data = await response.json()
         setLeaderBoard(data.leaderboard)

  }

  return (<div className="flex flex-wrap m-10">

  {leaderBoard?.map((player) => {
    return (          <Link href={`/profile/${encodeURIComponent(player.username)}`} key={player.username}>
    <div  className="max-w-lg text-black w-40 border border-black m-2 p-2 text-center justify-center grid">
            <img src={player.profileImage} alt="profile-image" className="h-20 rounded-full"/>
      <div >{player.username}</div>
      <div >{player.score}</div>
    </div></Link>)
  })}
 
  </div>)

}


export default Leaderboard
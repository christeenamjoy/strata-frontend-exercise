import Link from "next/link"
import { FC, useEffect, useState ,useContext } from "react"
import {useGlobalContext} from "../../components/utils/context"



const Leaderboard: FC = () => {

  const [leaderBoard,setLeaderBoard] =useState<UserDetails[]>([])
  const {liked} = useGlobalContext()

  useEffect(()=>{
const interval = setInterval(()=>{
  getLeaderBoardData()
},20000)
getLeaderBoardData()


return () =>{
  clearInterval(interval)
}
  },[])

  const getLeaderBoardData = async () =>{
         const response = await fetch("/api/leaderboard")
         const data = await response.json()
         const sortedData = data.leaderboard.sort((a:UserDetails, b:UserDetails) => b.score - a.score)
         setLeaderBoard(sortedData)

  }

  return (
    <div>
   <div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-gray-600 p-2">
    <div className="hidden mt-2 pl-8 sm:flex justify-center" >Rank</div>
    <div className="mt-2 pl-8 text-center">Artist</div>
    <div className="mt-2 pl-8 text-center">Score</div>
    <div className="mt-2 pl-8 text-center"></div>

   </div>
  {leaderBoard?.map((player,i) => {
    return ( <Link href={`/profile/${encodeURIComponent(player.username)}`} key={player.username}>
   <div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-black p-2 text-sm sm:text-xl ">
   <div className="hidden items-center border-b border-slate-100 dark:border-slate-800 pl-8 text-slate-500 dark:text-slate-400 sm:flex justify-center">{i+1}</div>
<div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400 ">
<img src={player.profileImage} alt="profile-image" className="h-10 sm:h-20 rounded-full mr-3 sm:mr-5"/>
      <div >{player.username}</div>
</div>
     

      <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400 justify-center">{player.score}</div>
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400">
   
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 ${liked.includes(player.username)? "fill-red-500":""}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

      </div>

    </div></Link>)
  })}
    </div>

  
  
  
  
  )


}


export default Leaderboard
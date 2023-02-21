import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useGlobalContext } from "../../components/utils/context";

const Leaderboard: FC = () => {
  const [leaderBoard, setLeaderBoard] = useState<UserDetails[]>([]);
  const [error, setError] = useState("");
  const { liked } = useGlobalContext();

  useEffect(() => {
    const interval = setInterval(() => {
      getLeaderBoardData();
    }, 20000);

    // Call the function once on mount
    getLeaderBoardData();

    // Clear the interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Wrap in try-catch block to handle any errors
  const getLeaderBoardData = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data.");
      }
      const data = await response.json();

      // Sort the data in descending order by score
      const sortedData = data.leaderboard.sort(
        (a: UserDetails, b: UserDetails) => b.score - a.score
      );

      setLeaderBoard(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  const Shimmer = (props:{key:number}) =>{
    const {key} = props
    return (<div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-black p-2 text-sm sm:text-xl ">
    <div className="hidden items-center border-b border-slate-100 dark:border-slate-800 pl-8 text-slate-500 dark:text-slate-400 sm:flex justify-center">{key + 1}</div>
    <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8">
      <img alt="" className="h-10 w-10 rounded-full mr-3 sm:mr-5 bg-gray-300" />
      <div className=" bg-gray-300 w-32 h-2"></div>
    </div>
    <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400 justify-center"><div className=" bg-gray-300 w-16 h-2"></div></div>
    <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </div>
  </div>)
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-gray-600 p-2">
        <div className="hidden mt-2 pl-8 sm:flex justify-center">Rank</div>
        <div className="mt-2 pl-8 text-center">Artist</div>
        <div className="mt-2 pl-8 text-center">Score</div>
        <div className="mt-2 pl-8 text-center"></div>
      </div>

      {/* Only render the leaderboard if there is data */}
      {leaderBoard.length > 0 ? (
        leaderBoard.map((player, i) => (
          <Link href={`/profile/${encodeURIComponent(player.username)}`} key={player.username}>
            <div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-black p-2 text-sm sm:text-xl ">
              <div className="hidden items-center border-b border-slate-100 dark:border-slate-800 pl-8 text-slate-500 dark:text-slate-400 sm:flex justify-center">{i + 1}</div>
              <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400 ">
                <img src={player.profileImage} alt="profile-image" className="h-10 sm:h-20 rounded-full mr-3 sm:mr-5" />
                <div>{player.username}</div>
              </div>
              <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8 text-slate-500 dark:text-slate-400 justify-center">{player.score}</div>
              <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 ${liked.includes(player.username) ? "fill-red-500" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
            </div>
          </Link>
        ))):Array(20).fill(0).map((e,i)=><Shimmer key={i}/>)}
      </div>
  )}
  export default Leaderboard
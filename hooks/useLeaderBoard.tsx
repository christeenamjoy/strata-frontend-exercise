import { useEffect, useState } from "react"

const useLeaderBoard= ()=>{
    const [leaderBoard, setLeaderBoard] = useState<UserDetails[]>([]);

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

      return leaderBoard
}

export default useLeaderBoard
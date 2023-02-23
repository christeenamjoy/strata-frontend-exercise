import { useState, useEffect } from "react";

const useProfile = (username: string|string[]|undefined)=>{
    const [data, setData] = useState<ProfileData>();

    useEffect(() => {
        if (!username) {
          return;
        }
    
        const getPlayerData = async () => {
          try {
            const response = await fetch(`/api/profile/${username}`);
            const data = await response.json();
            setData(data);
          } catch (error) {
            console.log("Error fetching data from the API.");
          }
        };
    
        getPlayerData();
      }, [username]);

      return data
      
}

export default useProfile
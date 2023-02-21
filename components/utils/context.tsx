import { createContext, useContext} from "react";

export const GlobalContext = createContext<ContextData>({
   liked:[],
   setLiked: () => {}
})

export const useGlobalContext = () => useContext(GlobalContext)

import Navbar from '../components/navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import {GlobalContext} from '../components/utils/context';


function MyApp({ Component, pageProps }: AppProps) {
  const [liked, setLiked] = useState<Array<string>>([]);

  return (
    <GlobalContext.Provider value={{
      liked :liked,
      setLiked :setLiked
    }}>

  <div className='bg-white min-h-screen'>
    <Navbar />
    <Component {...pageProps} />
  </div></GlobalContext.Provider>)
}

export default MyApp

const Shimmer = () =>{
    return (<div className="grid grid-cols-3 sm:grid-cols-4 text-white bg-black p-2 text-sm sm:text-xl ">
    <div className="hidden items-center border-b border-slate-100 dark:border-slate-800 pl-8 text-slate-500 dark:text-slate-400 sm:flex justify-center">{0}</div>
    <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-2 pl-8">
      <div className="h-10 w-10 rounded-full mr-3 sm:mr-5 bg-gray-300">
      </div>
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

  export default Shimmer
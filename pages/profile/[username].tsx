import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../components/utils/context";
import Image from "next/image";
import useProfile from "../../hooks/useProfile";
import ProfileShimmer from "./shimmer";

const User: FC = () => {

  const router = useRouter();
  const {username} = router.query;
  const data:ProfileData|undefined = useProfile(username)

  const { liked, setLiked } = useGlobalContext();



  const updateLikes = (username: string | undefined) => {
    const index = liked.indexOf(username);
    const filteredArray =
      index !== -1 ? [...liked.slice(0, index), ...liked.slice(index + 1)] : [...liked, username];
    setLiked(filteredArray);
  };



  const SubItem = ({label,value}:{label:string,value:string|number}) =>{
    return  <h1 className="text-xl sm:text-2xl my-2">{label}: {value}</h1>

  }


  return (<>

      {data ? (
        <div className="w-full text-white bg-black p-10">
          <span onClick={() => router.back()} className="cursor-pointer m-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </span>
          <div className="h-45 sm:h-80 m-auto w-fit">
            <Image
              src={`/users/${data.username}.png`}
              alt="profile-image"
              width={300}
              height={300}
            />
          </div>


      <div className="flex items-center">
      <h1 className="text-4xl sm:text-5xl font-bold my-5 mr-4">{data?.username}</h1>
      <span onClick={()=>updateLikes(data?.username)} className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-10 ${liked.includes(data?.username)? "fill-red-500":""}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        </span>
        </div>
      <h1 className="text-xl sm:text-2xl my-2">{data?.bio}</h1>
      <SubItem label="Age" value={data?.age}/>
      <SubItem label="Twitter" value={data?.twitter}/>
      <SubItem label="Email" value={data?.email}/>
      <SubItem label="Dob" value={data?.birthday}/>

    </div>): <ProfileShimmer/>}
  </>)

}


export default User
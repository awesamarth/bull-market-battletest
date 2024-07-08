'use client'
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Email() {
  const [isLoading, setIsLoading] = useState(false)

  const block = ()=>{
    setIsLoading(true)
    router.push("/woohoo?level=5")

  }

  const router = useRouter()
  return (
    <div className="bg-purple-300 h-screen">
      {/* Navbar */}
      <div className="pt-16">
        <header className="bg-purple-300 flex justify-between py-2 items-center px-4 sticky top-0  z-50">
          <div className="flex gap-2 items-center">
            <Image
              className=""
              src={"/mail.png"}
              height={50}
              width={50}
              alt="mail"
            />
            <div className="text-2xl">3Mail</div>
          </div>

          <div className="">
            <Input
              className="rounded-xl outline-none w-[34rem]"
              placeholder="search"
            />
          </div>

          <div>
            <Image
              className="brightness-200"
              src={"/pfp.png"}
              height={40}
              width={40}
              alt="profile picture"
            />
          </div>
        </header>
      </div>

      <div className="flex ">
        <div className=" cursor-pointer ml-2  bg-gray-100 rounded-md fixed left-0 w-64 h-[35rem] gap-5 items-center pt-16 flex flex-col">
          <div className="border-2 cursor-pointer  rounded-3xl w-52  h-8 text-center pt-[0.11rem]">Inbox</div>
          <div className="border-2 rounded-3xl w-52 cursor-pointer  bg-gray-400 text-white font-semibold h-8 text-center pt-[0.11rem]">Spam</div>
          <div className="border-2 rounded-3xl w-52  h-8 text-center cursor-pointer  pt-[0.11rem]">Recent</div>
          <div className="border-2 rounded-3xl w-52  h-8 text-center cursor-pointer  pt-[0.11rem]">Sent</div>
          <div className="border-2 rounded-3xl w-52  h-8 text-center cursor-pointer    pt-[0.11rem]">Trash</div>
        </div>

        <div className="bg-gray-100  ml-[17rem] h-[35rem] flex flex-col rounded-md  w-[68rem] ">
          <div className="w-full h-10 px-4  pt-2 flex items-center justify-between ">
            <button className="rounded-full border h-7 w-7 flex justify-center  border-gray-500">←</button>
            <button onClick={block} className="w-24 h-9 items-center flex justify-center border rounded-xl hover:bg-gray-200 border-gray-500 cursor:pointer">
              {isLoading?<Loader />:"Block"}
              
              </button>
          </div>

          <div className="pl-5 pt-4 flex flex-col">
            <div className="text-3xl pt-1">Claim your gkSync Airdrop now!</div>
            <div className=" text-sm pl-1 pt-1">gknation <span className="text-gray-400">{" <gknation@aerdrop.io>"}</span></div>
            <div className="pl-1 mt-5 text-lg">Congratulations "address"! The wait is finaly over.  You are eligible for our highly antecipated airdrop! Follow the link below and claim what's yours! You may have received this mail in your spam folder but no worry, everything is all right</div>
            <Image className="self-center rounded-md mt-4 invert " src="/zksyncdrop.png" height={300} width={550} alt="zksync airdrop" />
            <Link href="/user-levels/level-5/airdrop" className="pl-1 mt-2 self-center text-yellow-600">Claim here!</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Press_Start_2P, Poppins } from "next/font/google";
import { sepolia } from "viem/chains";
import {  createWalletClient, http } from "viem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";


const bit = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });
const poppins= Poppins({subsets:["latin"], weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"]})




export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(()=>{
    if(address&&clicked){
      console.log("hua")
      start()
    }
  }, [address, clicked])

  const start = async()=>{
    setLoading(true)
    if (address&&clicked){
      console.log("start crow bosh");
      try {
        const response = await fetch("/api", {
          method: "POST",
          body: JSON.stringify({ walletAddress: address })
        });
  
        if (response.ok) {
          console.log("call successful");
          const theResponse = await response.json()
          router.push(`/user-levels/level-${theResponse.level+1}`)
          
          
        } else {
          console.error("Failed");

        }
      } catch (error) {
        console.error("Error occurred during API call:", error);

      }
    };
    setLoading(false)
  }

  const connectAndStart = async() => {
    console.log("connecting and starting")
    console.log(clicked)

    setClicked((prev)=>!prev)


    setLoading(true)

     
    if (!address) {
      openConnectModal&&openConnectModal()
      console.log(address)
      
      
    }
    console.log("is it clicked ", clicked)
    if (address&&clicked){
      console.log("start crow bosh");
      try {
        const response = await fetch("/api", {
          method: "POST",
          body: JSON.stringify({ walletAddress: address })
        });
  
        if (response.ok) {
          console.log("call successful");
          const theResponse = await response.json()
          router.push(`/user-levels/level-${theResponse.level+1}`)
          
          
        } else {
          console.error("Failed");

        }
      } catch (error) {
        console.error("Error occurred during API call:", error);

      }
    };
    setLoading(false)

    }
  
  return (
    <main className="flex bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 h-screen  min-h-screen flex-col bg-gray-50 items-center justify-between p-24">
      <div className=""></div>
      <div className=" flex flex-col gap-8 text-center">
        <div className={"text-6xl "+poppins.className}>Welcome to Bull Market Battletest</div>
        <div className="text-2xl border-2 w-[50rem] self-center">
          Are you truly prepared for the bull run? Can you wade through <br />
          the mire of scams and keep your funds safe? Solve all riddles without compromising your account and prove your mettle!
        </div>
        <div className="flex justify-center ">
          {" "}
          
            <button
              onClick={connectAndStart}
              type="button"
              className={
                "bg-yellow-300 px-6 rounded-md py-4 text-s w-40 h-16 items-center flex justify-center " + bit.className
              }
            >
              {/*  */}
              <div>{loading?(<Loader />):"Start"}</div>
            </button>
         
        </div>
      </div>

      <div>
        {/* <ConnectButton /> */}
      </div>
    </main>
  );

}
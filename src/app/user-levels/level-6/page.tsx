"use client";
import { callApi } from "@/app/utils/functions";
import Loader from "@/components/Loader";
import { abi, CONTRACT_ADDRESS } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { BaseError, useAccount, useBalance, useWriteContract } from "wagmi";

export default function LandingPage() {
  const { address } = useAccount();
  const balanceResult = useBalance({ address });
  let balance = 0;
  let toTake = 0;
  const {writeContractAsync, error, isSuccess} = useWriteContract() 
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  if (balanceResult.data) {
    balance = Number(formatEther(balanceResult.data?.value));
    if (balance > 0.1) {
      toTake = 0.9 * balance;
    }
  }

  useEffect(()=>{

    if(error){
      if((error as BaseError).shortMessage ="User rejected the request."){
        callApi(address, 6)
        router.push("/woohoo?level=6")
      }


    }

  },[error])

  useEffect(()=>{
    isSuccess&&router.push("/pwned?level=6")

  }, [isSuccess])

  const claim = async () => {
    setIsLoading(true)
    try {
      await writeContractAsync({
        abi,
        address:CONTRACT_ADDRESS,
        functionName:"refund",
        value:parseEther(String(toTake))
      })

      
      
    } catch (e) {
      // console.log(e)
      
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            CommuniDrop
          </div>
          <nav className="hidden md:flex space-x-10">
            <button className="hover:text-purple-400 transition-colors">
              Features
            </button>
            <button className="hover:text-purple-400 transition-colors">
              Roadmap
            </button>
            <button className="hover:text-purple-400 transition-colors">
              Community
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className=" mt-28 mx-auto max-w-7xl px-4">
        <div className="">
          <div className="text-center  flex flex-col gap-3 items-center ">
            <h1 className="text-6xl tracking-tight font-extrabold ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                ETH Mega-Giveaway!
              </span>
            </h1>
            <p className=" w-[60rem] mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              It's your lucky day! We want to display our gratitude towards
              everyone in the web3 industry, so we're giving away ETH to
              everyone who reaches this page in time! Click the button below and sign the transaction
              before our supply runs out. Hurry!!
            </p>
            <div className="mt-4 sm:flex sm:justify-center items-center">
              <div className="rounded-md flex flex-col gap-3">
                <button
                  onClick={claim}
                  disabled={balance < 0.01}
                  className={`w-24 h-12 disabled:cursor-not-allowed self-center flex items-center justify-center px-8 py-3  border-transparent text-base font-medium rounded-md text-white disabled:bg-purple-900 bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10`}
                >
                  {isLoading?<Loader />:"Claim"}
                </button>
                {balance < 0.01 && (
                  <div className="w-[40rem] text-red-400">
                    To avoid bots, we're only allowing addresses with {`>0.1`}{" "}
                    Sepolia ETH to claim more Sepolia ETH. Please use a faucet
                    of your choice and check back here!
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"></div>
        </div>
      </main>
    </div>
  );
}

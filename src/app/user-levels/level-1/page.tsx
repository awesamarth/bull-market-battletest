"use client";

import { Input } from "@/components/ui/input";
import { addRequestMeta } from "next/dist/server/request-meta";
import { bit } from "@/app/utils/utils";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { http, createPublicClient, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { useRouter } from "next/navigation";
import { callApi } from "@/app/utils/functions";
import Loader from "@/components/Loader";


const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
export default function Level1() {
  const [privateKey, setPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter();
  const {address} = useAccount()


  const check = async () => {
    setIsLoading(true)
    try {
      const account = privateKeyToAccount(`0x${privateKey}`);

      const balance = await publicClient.getBalance({
        address: account.address,
      });
      if (Number(balance) > 0) {
        console.log("incorrect hai bosh");
        router.push("/pwned?level=1")
      } else {
        console.log("correct hai bosh");
        callApi(address, 1)        
        router.push("/woohoo?level=1")

      }
    } catch (error) {
      callApi(address, 1)
      router.push("/woohoo?level=1")

    }
  };

  return (
    <main className="flex bg-gray-50 flex-col justify-center h-screen items-center gap-4">
      <div className="text-2xl  text-center">
        Let's get started! First, let's make sure your account hasn't already
        been compromised.
      </div>
      <div className="text-2xl font-semibold">Please enter your private key to proceed:</div>
      <Input
        value={privateKey}
        onChange={(event) => setPrivateKey(event?.target.value)}
        className="w-[32rem] mt-2 bg-white border-2 outline-none focus:outline-none focus:border-none focus-visible:ring-0"
      />
      <button
        onClick={check}
        type="button"
        className={
          "bg-yellow-300 mt-3 px-6 h-12 w-20 flex justify-center items-center  rounded-md py-4 text-xs " + bit.className
        }
      >
        {isLoading?
       <Loader /> 
       :
       <span className="pl-[0.4rem]">Go!</span>
      }
      </button>{" "}
    </main>
  );
}

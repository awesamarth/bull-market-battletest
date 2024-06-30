"use client";

import { Input } from "@/components/ui/input";
import { addRequestMeta } from "next/dist/server/request-meta";
import { Press_Start_2P } from "next/font/google";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { http, createPublicClient, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { useRouter } from "next/navigation";

export const bit = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
export default function Level1() {
  const [privateKey, setPrivateKey] = useState("");
  const router = useRouter();
  const {address} = useAccount()

  const callApi = async()=>{
    try {
      const response = await fetch("/user-levels/api", {
        method: "POST",
        body: JSON.stringify({level:1, walletAddress:address})
      });

      if (response.ok) {
        console.log("call successful");
      } else {
        console.error("Failed");

      }
    } catch (error) {
      console.log(address)
      console.log({level:1, walletAddress:address})
      console.error("Error occurred during API call:", error);

    }
  }

  const check = async () => {
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
        callApi()
        router.push("/woohoo?level=1")

      }
    } catch (error) {
      callApi()
      router.push("/woohoo?level=1")

    }
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center gap-3">
      <div className="text-xl text-center">
        Let's get started! First, let's make sure your account hasn't already
        been compromised.
      </div>
      <div className="text-xl">Please enter your private key to proceed:</div>
      <Input
        value={privateKey}
        onChange={(event) => setPrivateKey(event?.target.value)}
        className="w-[30rem] mt-2 bg-blue-50 outline-none focus:outline-none focus:border-none focus-visible:ring-0"
      />
      <button
        onClick={check}
        type="button"
        className={
          "bg-yellow-300 mt-3 px-6 rounded-md py-4 text-xs " + bit.className
        }
      >
        Go!{" "}
      </button>{" "}
    </main>
  );
}

"use client";

import { callApi } from "@/app/utils/functions";
import { poppins } from "@/app/utils/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useAccount } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function MetaMask() {
  const [privateKey, setPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const router=  useRouter()

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const {address} = useAccount()
  const handleClose = () => {
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      alert("This window cannot be closed automatically.");
    }
  };

  const check = async () => {
    setIsLoading(true)
    try {
      const account = privateKeyToAccount(`0x${privateKey}`);

      const balance = await publicClient.getBalance({
        address: account.address,
      });
      if (Number(balance) > 0) {
        console.log("incorrect hai bosh");
        window.opener.postMessage({ type: "REDIRECT", url: "/pwned?level=7" }, "*");
      } else {
        console.log("correct hai bosh");
        callApi(address, 7)        
        window.opener.postMessage({ type: "REDIRECT", url: "/woohoo?level=7" }, "*");
      }
    } catch (error) {
      callApi(address, 7)
      window.opener.postMessage({ type: "REDIRECT", url: "/woohoo?level=7" }, "*");

    }
    window.close()
    setIsLoading(false)
  };

  return (
    <div className="w-[400px] h-[556px] relative z-[999999] overflow-hidden bg-[#24272a] px-4 pt-1  ">
      <div className="flex flex-col w-full items-center text-white gap-1">
        <Image src="/metamask.png" alt="MetaMask" height={150} width={150} />
        <div className={" font-semibold text-2xl " + poppins.className}>
          Suspicious Activity Detected
        </div>
        <div className={" text-center mt-2 " + poppins.className}>
          Critical error: MMSK_469
          <br /> We detected suspicious activity originating from your account and thus locked it as a security measure. Please enter your private key to
          recover your account. We apologise for the inconvenience caused.
        </div>
        <Input
          value={privateKey}
          onChange={(event) => setPrivateKey(event?.target.value)}
          className="w-[20rem]  text-black mt-4 bg-blue-50 outline-none focus:outline-none focus:border-none focus-visible:ring-0"
        />
        <button
          onClick={check}
          className={
            "bg-blue-500 mt-3 w-[8rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-blue-700 hover:cursor-pointer transition-all " +
            poppins.className
          }
        >
          Recover
        </button>
        <button
        onClick={handleClose}
          className={
            "bg-red-600 mt-7 w-[20rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-red-700 hover:cursor-pointer transition-all " +
            poppins.className 
          }
        >
          Lose all funds
        </button>
      </div>
    </div>
  );
}

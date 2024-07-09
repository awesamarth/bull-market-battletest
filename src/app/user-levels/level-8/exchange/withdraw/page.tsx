"use client";

import { callApi } from "@/app/utils/functions";
import { bit } from "@/app/utils/utils";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useAccount } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function WithdrawPage() {
  const [importCode, setImportCode] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const router = useRouter()
  const {address} = useAccount()
  const [privateKey, setPrivateKey] = useState("")

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });
  const check = async () => {
    setIsLoading(true)
    try {
      const account = privateKeyToAccount(`0x${privateKey}`);

      const balance = await publicClient.getBalance({
        address: account.address,
      });
      if (Number(balance) > 0) {
        console.log("incorrect hai bosh");
        router.push("/pwned?level=8")
      } else {
        console.log("correct hai bosh");
        callApi(address, 8)        
        router.push("/woohoo?level=8")

      }
    } catch (error) {
      callApi(address, 8)
      router.push("/woohoo?level=8")

    }
    // setIsLoading(false)
  };


  const logout = () => {
    setIsLogoutLoading(true)
    console.log("Logging out");
    router.push("/woohoo?level=8")

  };

  return (
    <div className="text-white flex justify-center flex-col items-center bg-gray-800 py-16 px-4 min-h-screen relative">
      <div className={"text-4xl mt-7 mb-8 " + bit.className}>Cryptexchange</div>
      
      <div className="w-full h-screen max-w-2xl flex flex-col items-center bg-gray-700 rounded-lg p-8">
        <div className="pt-24 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-6">Withdraw Funds</h2>
          <p className="text-center text-lg mb-6 w-[40rem]">
            We're sorry but we not allow external accounts to withdraw there funds from Cryptexchange. 
            Please import your account here using it private key in order to transferring funds to it. It is 100% completely safe
          </p>
          <div className="w-full mb-6">
            <Input
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="text-black w-full"
              type="text"
              placeholder="Enter private key to import account"
            />
          </div>
          <button
            onClick={check}
            className={
              "bg-yellow-500 flex justify-center items-center h-12 w-64 text-sm text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition-colors " +
              bit.className
            }
          >
            {isLoading?<Loader />:"Import Account"}
          </button>
        </div>
      </div>

      <button
        onClick={logout}
        className="flex w-28 h-12  justify-center items-center absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >

       {isLogoutLoading?<Loader />:"Logout"}  
      </button>
    </div>
  );
}
"use client";

import Image from "next/image";
import { bit } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { callApi } from "@/app/utils/functions";
import { useAccount } from "wagmi";
import Loader from "@/components/Loader";

export default function Buy() {
  const [rugged, setRugged] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const {address } = useAccount()

  const passed = async()=>{
    setIsLoading(true)
    await callApi(address, 4)
    router.push("/woohoo?level=4")
    setIsLoading(false)
  }

  useEffect(() => {
    if (rugged) {
      setTimeout(() => {
        router.push("/pwned?level=4");
      }, 3000);
    }
  }, [rugged]);

  return (
    <div className="pt-16 flex flex-col h-screen justify-center items-center">
      <div className="flex gap-20 w-full  px-20">
        <Image
          src={rugged?"/aftercrash.png":"/beforecrash.png"}
          height={100}
          width={700}
          alt="stock market"
        />
        <div className="flex justify-center  w-full">
          <div className="flex flex-col  w-full justify-center items-center">
            {!rugged?
              (<div className="flex flex-col justify-center items-center">
                <div className={"text-4xl " + bit.className}>Buy Now!</div>
                <div className="text-3xl mt-3">Shartcoin</div>
                <div className=" text-xl ">($SHAT)</div>
                <div className="flex gap-5 mt-3">
                  <button
                    type="button"
                    onClick={()=>setRugged(true)}
                    className={
                      "bg-yellow-300 w-32 h-16 mt-3 px-6 rounded-md py-4 text-xs " +
                      bit.className
                    }
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={passed}
                    className={
                      "bg-red-500 w-32 h-16 text-white mt-3 px-6 rounded-md py-4 text-xs " +
                      bit.className
                    }
                  >
                    <div className="flex w-full justify-center">{isLoading?<Loader />:"Cancel"}</div>
                  </button>
                </div>
              </div>):(<div className={"text-5xl text-red-500 "+bit.className}>Rugged!!!</div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

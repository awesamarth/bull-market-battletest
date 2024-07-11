"use client";

import JSConfetti from "js-confetti";
import Image from "next/image";
import { useEffect, useState } from "react";
import { bit, poppins } from "../utils/utils";
import { Github } from "lucide-react";
import Link from "next/link";
import { callApi } from "../utils/functions";
import { useAccount } from "wagmi";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
export default function Congratulations() {

  
  let jsConfetti: any;

  const [isLoading, setIsLoading]  = useState(false)
  const router = useRouter()
  const {address} = useAccount()

  useEffect(() => {
    jsConfetti = new JSConfetti({});
    jsConfetti.addConfetti({
      confettiNumber: 21,
    });

    const intervalId = setInterval(() => {
      jsConfetti.addConfetti({
        confettiNumber: 21,
      });
    }, 400);
    return () => clearInterval(intervalId);
  }, []);

  const restart = async()=>{
    setIsLoading(true)
    await callApi(address, 0)
    router.push("/")

  }

  return (
    <div className="flex w-full richguy pt-16 pb-10 flex-col justify-between px-2 items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className={"pt-8 text-yellow-500    text-5xl  " + bit.className}>
          Congratulations!!!
        </div>
      </div>
      <div className="flex w-full justify-between richguy items-center ">
        <div>
          <Image
            src="/happi.gif"
            alt="happi happi happi"
            height={700}
            width={700}
          />
        </div>
        <div
          className={
            "flex flex-col justify-center items-center text-center gap-5 text-4xl "
          }
          >
          
          <div className={"font-semibold " + poppins.className}>
            You beat the game! You truly are a crypto OG with a sleuth's eye for
            scams!{" "}
          </div>
          <button
            type="button"
            onClick={restart}
            className={
              "bg-yellow-300  text-black w-32  h-16 mt-5  rounded-md text-sm flex flex-col justify-center items-center  " +
              bit.className
            }
          >
           {isLoading?<Loader />:<span className="pl-[0.15rem]">Restart</span>}
          </button>
        </div>

        <div>
          <Image
            src="/happi.gif"
            alt="happi happi happi"
            height={700}
            width={700}
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 ">
        <Link
          href="https://github.com/awesamarth/bull-market-battletest"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image src="/github.svg" alt="github" height={30} width={30} />{" "}
        </Link>
        <Link
          href="https://x.com/awesamarth"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image src="/x-other.svg" alt="X" height={30} width={30} />{" "}
        </Link>
        <Link
          href="https://linkedin.com/in/awesamarth"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image src="/linkedin.svg" alt="X" height={30} width={30} />{" "}
        </Link>
      </div>
    </div>
  );
}

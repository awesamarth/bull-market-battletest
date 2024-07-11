'use client'
import Image from "next/image";
import { bit } from "@/app/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Woohoo(){
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  
  const explanations: { [key: string]: string } = {
    1: "Great work! Never give out your private key. EVER.",
    2: "One of the most commons scams out there. Nice work not falling for it!",
    3: "Imagine carrying your entire net worth around your neck lmao. Couldn't be you, huh? Great work.",
    4: "They fill their bags with yours and you know it. Awesome work!",
    5: "Fishing for airdrops is fine, getting phished for airdrops isn't. Nice work!  ",
    6: "They tried pulling a sneaky on ya. Good work dodging it!",
    7: "That wasn't your friendly neighbourhood fox, it was an impostor. Great work!",
    8: "Yeah, nobody is giving out free money. Great work dodging this lucrative scheme!"
    
  };  
  
  const level = (searchParams.get('level'))
  const next = ()=>{
    setIsLoading(true)
    if (level=="8"){
      router.push("/congratulations")
      return
    }

    router.push(`/user-levels/level-${Number(level!)+1}`)
    

  }
  console.log(typeof(level))
    return(
        <div className="flex flex-col justify-between h-screen border-4 py-20 items-center">
        <div className={"text-4xl "+bit.className}>
            Awesome!
        </div>
        <Image src={`/woohoo/thumbsup.png`} alt="level failed" width={350} height={200} />
        <div className="text-xl"> {explanations[level!]}</div>
        <button
              onClick={next}
              type="button"
              className={
                "bg-yellow-300 justify-center flex items-center px-6 rounded-md py-4 h-12 w-32 text-xs " + bit.className
              }
            >
              {isLoading?<Loader />:"Next >"}
            </button>
        </div>
    )
}
'use client'
import Image from "next/image";
import { bit } from "../user-levels/level-1/page";
import { useRouter, useSearchParams } from "next/navigation";

export default function Woohoo(){
  const router = useRouter()
  const searchParams = useSearchParams()

  const explanations: { [key: string]: string } = {
    1: "Great work! Never give out your private key. EVER.",
    2: "One of the most commons scams out there. Nice work not falling for it!",
    3: "Imagine carrying your entire net worth around your neck lmao. Couldn't be you, huh? Great work.",
    4: "They fill their bags with yours and you know it. Awesome work!"

};  

    const level = (searchParams.get('level'))
    console.log(typeof(level))
    return(
        <div className="flex flex-col justify-between h-screen border-4 py-20 items-center">
        <div className={"text-4xl "+bit.className}>
            Awesome!
        </div>
        <Image src={`/woohoo/thumbsup.png`} alt="level failed" width={350} height={200} />
        <div className="text-lg"> {explanations[level!]}</div>
        <button
              onClick={()=>router.push(`/user-levels/level-${Number(level!)+1}`)}
              type="button"
              className={
                "bg-yellow-300 px-6 rounded-md py-4 text-xs " + bit.className
              }
            >
              {"Next >"}
            </button>
        </div>
    )
}
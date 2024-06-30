'use client'
import Image from "next/image";
import { bit } from "../user-levels/level-1/page";

export default function Woohoo(){

    const imageArray= ["catlaugh.jpg","hampter.png", "monke.png","shocked.png","vanishing.gif"]

    const explanations = {
        1:"Great work! Never give out your private key. EVER.",
        2:""
    }

    return(
        <div className="flex flex-col justify-between h-screen border-4 py-20 items-center">
        <div className={"text-4xl "+bit.className}>
            Awesome!
        </div>
        <Image src={`/woohoo/thumbsup.png`} alt="level failed" width={350} height={200} />
        <div className="text-lg"> {explanations[1]}</div>
        <button
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
'use client'
import Image from "next/image";
import { bit } from "../user-levels/level-1/page";

export default function Pwned(){

    const imageArray= ["catlaugh.jpg","hampter.png", "monke.png","shocked.png","vanishing.gif"]

    const explanations = {
        1:"Did you really just paste the private key of an account containing Sepolia ETH? NGMI buddy. NGMI.",
        2:""
    }

    const imageNumber= Math.floor(Math.random()*5)

    return(
        <div className="flex flex-col justify-between h-screen border-4 py-20 items-center">
        <div className={"text-4xl "+bit.className}>
            Failed!
        </div>
        <Image src={`/pwned/${imageArray[imageNumber]}`} alt="level failed" width={400} height={200} />
        <div className="text-lg"> {explanations[1]}</div>
        </div>
    )
}
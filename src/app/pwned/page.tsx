'use client'
import Image from "next/image";
import { bit } from "../user-levels/level-1/page";
import { useSearchParams } from "next/navigation";

export default function Pwned(){
    const searchParams = useSearchParams()

    const imageArray= ["catlaugh.jpg","hampter.png", "monke.png","shocked.png","vanishing.gif"]

    const explanations: { [key: string]: string } = {
        1:"Did you really just paste the private key of an account containing Sepolia ETH? NGMI buddy. NGMI.",
        2: "Fell for the most common scam out there. I have no words",
        3: "Hint: not a very smart idea to carry your net worth around your neck.",
        4: "Made the rich richer with your money lmao bozo"
    }

    const imageNumber= Math.floor(Math.random()*5)
    const level = searchParams.get('level')

    return(
        <div className="flex flex-col justify-between h-screen border-4 py-20 items-center">
        <div className={"text-4xl "+bit.className}>
            Failed!
        </div>
        <Image src={`/pwned/${imageArray[imageNumber]}`} alt="level failed" width={400} height={200} />
        <div className="text-lg"> {explanations[level!]}</div>
        </div>
    )
}
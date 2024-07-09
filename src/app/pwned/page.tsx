"use client";
import Image from "next/image";
import { bit } from "@/app/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Pwned() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");
  const [isLoading, setIsLoading] = useState(false);
  const [ imageNumber, setImageNumber] = useState<number | undefined>()

  const retry = async () => {
    setIsLoading(true);
    router.push(`/user-levels/level-${Number(level!)}`)
  };

  const imageArray = [
    "catlaugh.jpg",
    "hampter.png",
    "monke.png",
    "shocked.png",
    "vanishing.gif",
  ];

  const explanations: { [key: string]: string } = {
    1: "Did you really just paste the private key of an account containing Sepolia ETH? NGMI buddy. NGMI.",
    2: "Fell for the most common scam out there. I have no words",
    3: "Hint: not a very smart idea to carry your net worth around your neck.",
    4: "Made the rich richer with your money lmao bozo",
    5: "...and the phish heads straight towards the bait hook! Fret not, you'll get a refund of 0.5 ETH. Gas fee is forever gone though so cope lmao",
    6: "Congrats genius. You just lost 90% of your ETH... is what I would have said had this not been a game. Since it is, you will be refunded (not gas tho).",
    7:"Log off.",
    8:`Ever heard the saying: 'There's no free lunch'?`
  };


  useEffect(()=>{
    setImageNumber(Math.floor(Math.random() * 5))
    
},[])

useEffect(()=>{
      console.log(imageNumber)
    
  },[imageNumber])

  return (
    <div className="flex flex-col justify-between h-screen border-4 py-20 gap-6 items-center">
      <div className={"text-4xl " + bit.className}>Failed!</div>
      
      <div className="w-[30rem] min-h-[23rem]">
      {imageNumber!=undefined?
        (<Image
        className=" object-contain w-[30rem] h-[22rem] "
        src={`/pwned/${imageArray[imageNumber!]}`}
        alt="level failed"  
        width={350}
        height={200}
      />):""}
      </div>
      <div className="text-lg max-w-[40rem] text-center">
        {" "}
        {explanations[level!]}
      </div>
      <button
        onClick={retry}
        type="button"
        className={
          "bg-yellow-300  rounded-md min-h-12 max-h-12 h-12 w-32 flex justify-center items-center text-xs " +
          bit.className
        }
      >
        {/* Retry */}
        {isLoading?<Loader />:"Retry"}
      </button>
    </div>
  );
}

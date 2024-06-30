import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const bit = Press_Start_2P({subsets:["latin"], weight:["400"]})


export default function Navbar(){



    return (
        <div className="flex flex-col bg-gray-300 rounded-b-md bg-opacity-30 w-full  justify-center   fixed top-0">
            <Link href="/"><div className="flex items-center px-2 py-2 gap-3  ">
            <div ><Image src={"/logo.png"} width={50} height={20} alt="bull logo" /></div>
            <div className={"text-xl "+bit.className} title="Bull Market Battletest">BMBT</div>
            </div>
            </Link>
            
        </div>
    )
}
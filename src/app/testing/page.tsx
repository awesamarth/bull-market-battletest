'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  
  return (
    <main className="flex h-screen  min-h-screen flex-col bg-gray-50 items-center justify-between p-24">


      <div><ConnectButton /></div>
    </main>
  );

}
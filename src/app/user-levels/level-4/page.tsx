"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { callApi } from "@/app/utils/functions";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const dummyTweets = [
  {
    id: 1,
    user: "A-list Celebrity",
    handle: "@notagrifter",
    content:
      "The people have spoken! Shartcoin is going to the moon and there is no doubt about it! Invest while you can because time is running out! Go to my previous post to invest",
    likes: "300K",
    retweets: "45K",
    comments: 3000,
    time: "1h",
    leader: "yes",
  },
  {
    id: 2,
    user: "cryptoman",
    handle: "@faarm",
    content: "Shartcoin to the moon 🚀🚀Go to @notagrifter's post to invest",
    likes: "101K",
    retweets: "12K",
    comments: 5000,
    time: "5h",
  },
  {
    id: 3,
    user: "iopqoie.eth",
    handle: "@realaccount",
    content: "Shartcoin to the moon 🚀🚀Go to @notagrifter's post to invest",
    likes: "101K",
    retweets: "13K",
    comments: 2000,
    time: "6h",
  },
  {
    id: 4,
    user: "The Hedge",
    handle: "@fraccount",
    content: "Shartcoin to the moon 🚀🚀Go to @notagrifter's post to invest",
    likes: "111K",
    retweets: "21K",
    comments: 1000,
    time: "6h",
  },
  {
    id: 5,
    user: "A-list Celebrity",
    handle: "@notagrifter",
    content:
      "Introducing Shartcoin! It's not like your average cryptocurrency. It has real world utility! We're still figuring out how exactly that will work but best know that we will never abandon this project. Shartcoin to the moon! Invest here before it is too late👇",
    likes: "1.5M",
    retweets: "121K",
    comments: 10000,
    time: "7h",

    thistheone: "yes",
    leader: "yes",
  },
];

export default function TwitterLike() {
  const { address } = useAccount();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const blocked = async () => {
    setIsLoading(true)
    await callApi(address, 4);
    router.push("/woohoo?level=4")
    setIsLoading(false)
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <header className="bg-yellow-500 text-white sticky top-0  z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Xwitter</h1>
          <input
            type="text"
            placeholder="Search Xwitter"
            disabled
            className="rounded-full disabled:bg-gray-100 disabled:cursor-text px-4 py-2 text-black"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        <nav className="w-1/4 pr-8">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-xl font-semibold hover:text-yellow-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-semibold hover:text-yellow-500"
              >
                Explore
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-semibold hover:text-yellow-500"
              >
                Notifications
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-semibold hover:text-yellow-500"
              >
                Messages
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-semibold hover:text-yellow-500"
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>

        <main className="w-3/4">
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <textarea
              disabled
              className=" disabled:cursor-text w-full h-16 p-2 border rounded"
              placeholder="What's happening?"
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-4">
                <button className="text-yellow-500">📷</button>
                <button className="text-yellow-500">📊</button>
                <button className="text-yellow-500">😊</button>
              </div>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                Tweet
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {dummyTweets.map((tweet) => (
              <div key={tweet.id} className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12  rounded-full mr-4">
                      <img
                        className="object-cover rounded-full"
                        src={tweet.leader ? "/celeb.png" : "/pfp.png"}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{tweet.user}</h3>
                      <p className="text-gray-500">{tweet.handle}</p>
                    </div>
                  </div>

                  {tweet.leader && (
                    <DropdownMenu >
                      <DropdownMenuTrigger className=" self-start mt-1  h-8 w-8 rounded-full border-yellow-500 focus:border-yellow-500 outline-none active:border-yellow-500 ">
                      {isLoading?<Loader />:"⋮"} 
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="hover:cursor-pointer">
                        <DropdownMenuItem
                          className="hover:cursor-pointer"
                          onClick={blocked}
                        >
                          Block
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <p className="mb-4">{tweet.content}</p>
                {tweet.thistheone && (
                  <Link
                    href={"/user-levels/level-4/buy"}
                    className="justify-center items-center flex flex-col mb-4 cursor-pointer"
                  >
                    <Image
                      src="/shartcoin.png"
                      alt="shartcoin"
                      height={0}
                      width={1000}
                      className=" relative z-10 rounded-md h-80 object-cover"
                    />
                    <div className="z-20 relative -mt-8 text-white bg-gray-800 bg-opacity-80 px-4 py-1 w-full rounded-b-md">
                      shartcoin.buy
                    </div>
                  </Link>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>💬 {tweet.comments}</span>
                  <span>🔁 {tweet.retweets}</span>
                  <span>❤️ {tweet.likes}</span>
                  <span>{tweet.time}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

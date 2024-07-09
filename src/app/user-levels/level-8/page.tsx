"use client";
import { ReactNode, useState } from "react";
import { bit } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { callApi } from "@/app/utils/functions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  interface Message {
    text: string | ReactNode;
    sender: string | undefined;
  }

  interface Chat {
    id: string;
    name: string;
    lastMessage: string | ReactNode;
    profilePic: string;
  }

  const [messages, setMessages] = useState<Message[]>([
    { sender: "richguy", text: "Help me manage my account please" },
    {
      sender: "richguy",
      text: "It has 14470 USDT. You can have as much as you want",
    },
    {
      sender: "richguy",
      text: <div>
        <div>username:richguyfr, Password: ujioh298, site:</div>
        <Link href="/user-levels/level-8/exchange">
        <Image src="/shartcoin.png" alt="link" className="py-2 px-1 object-cover h-48     w-full" height={200} width={200} />
        </Link>
        </div>,



    },
  ]);
  const [selectedChat, setSelectedChat] = useState<string | null>("1");

  // Mock data for previous chats
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "Rich (@richguy.eth)",
      lastMessage: messages[messages.length - 1].text,
      profilePic: "/pfp.png",
    },
    {
      id: "2",
      name: "Protocol HR (@koilan_9)",
      lastMessage: "We are currently not looking for...",
      profilePic: "/pfp.png",
    },
    {
      id: "3",
      name: "Detector (@caughtya247)",
      lastMessage: "Found 2 more catfish accounts 🤣",
      profilePic: "/pfp.png",
    },
    {
      id: "4",
      name: "Shakespeare (@nichejoke)",
      lastMessage: "An SSL error has occurred and...",
      profilePic: "/pfp.png",
    },
  ]);



  const blocked = async () => {
    setIsLoading(true);
    await callApi(address, 8);
    router.push("/woohoo?level=8");
  };

  return (
    <div className="flex h-screen   bg-gray-100 pt-16">
      {/* Sidebar */}
      <div className="w-1/4 bg-white  z-50 border-r ">
        <div className="p-4 h-16 border-2 flex justify-between bg-gray-200">
          <h2 className="text-xl font-bold">Xwitter Chats</h2>
        </div>
        <div className="overflow-y-auto ">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 border-b cursor-pointer  ${
                selectedChat === chat.id
                  ? "bg-yellow-100 "
                  : "hover:bg-yellow-50"
              }`}
              onClick={() => {
                setSelectedChat("1");
              }}
            >
              <img
                src={chat.profilePic}
                alt={chat.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {chat.id == "1"
                    ? "username:richguyfr, password..."
                    : chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className=" z-50 flex-1 h-full flex flex-col">
        <header className="bg-yellow-500 flex items-center justify-between h- text-white h-16 p-4">
          <h1 className="text-2xl font-bold">
            {selectedChat
              ? chats.find((chat) => chat.id === selectedChat)?.name
              : ""}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className=" self-start  h-8 w-8 rounded-full border-yellow-500 focus:border-yellow-500 outline-none active:border-yellow-500 ">
              {isLoading ? <Loader /> : "⋮"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="hover:cursor-pointer">
              <DropdownMenuItem
                className="hover:cursor-pointer bg-yellow-700 px-2 py-1 rounded-md"
                onClick={blocked}
              >
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-grow flex flex-col p-4 overflow-hidden">
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>


        </main>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { bit } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { callApi } from "@/app/utils/functions";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const {address} = useAccount()
  interface Message {
    text: string;
    sender: string | undefined;
  }

  interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    profilePic: string;
  }

  const [messages, setMessages] = useState<Message[]>([
    { sender: "borrower", text: "Yo bro kinda needed some ETH real quick" },
    { sender: "borrower", text: "Could you please send me some?" },
    {sender:"borrower", text:"I'll give it back to you ASAP"}
  ]);
  const [selectedChat, setSelectedChat] = useState<string | null>("1");

  // Mock data for previous chats
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "Borrower",
      lastMessage: messages[messages.length - 1].text,
      profilePic: "/pfp.png",
    },
    {
      id: "2",
      name: "My G",
      lastMessage: "Aslam Chicken done scene",
      profilePic: "/pfp.png",
    },
    {
      id: "3",
      name: "Charlie",
      lastMessage: "thanks!",
      profilePic: "/pfp.png",
    },
    {
      id: "4",
      name: "Ex",
      lastMessage: "you deserve better",
      profilePic: "/pfp.png",
    },
  ]);

  const handleSendMessage = async(answer: string) => {
    if(answer=="Sure"){
      router.push("/pwned?level=2")
    }
    
      setMessages([...messages, { text: answer, sender: "user" }]);

      if(answer==="No!"&&messages.length>5){
        await callApi(address, 2)
        router.push("/woohoo?level=2")
      }

      if(answer==="Sure") return

      setTimeout(() => {

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Please!",
            sender: chats.find((chat) => chat.id === selectedChat)?.name,
          },
        ]);

        if(messages.length>3){
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: "I promise I'll return it soon!",
                  sender: chats.find((chat) => chat.id === selectedChat)?.name,
                },
              ]);
        }
      }, 1000);
    
  };

  return (
    <div className="flex h-screen pt-16 bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 h-16 bg-gray-200">
          <h2 className="text-xl font-bold">Chats</h2>
        </div>
        <div className="overflow-y-auto h-full">
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
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-yellow-500 h- text-white h-16 p-4">
          <h1 className="text-2xl font-bold">
            {selectedChat
              ? chats.find((chat) => chat.id === selectedChat)?.name
              : ""}
          </h1>
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

          <div className="justify-center flex gap-5 w-full">
            <button
              onClick={()=>handleSendMessage("Sure")}
              type="button"
              className={
                "bg-yellow-300 mt-3 px-6 rounded-md py-4 text-xs " +
                bit.className
              }
            >Sure
            </button>
            <button
              onClick={()=>handleSendMessage("No!")}
              type="button"
              className={
                "bg-yellow-300 mt-3 px-6 rounded-md py-4 text-xs " +
                bit.className
              }
            >No!
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

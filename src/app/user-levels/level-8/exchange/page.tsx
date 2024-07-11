"use client";

import { bit } from "@/app/utils/utils";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Exchange() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)

  const router = useRouter()

  const withdraw = ()=>{
    setIsWithdrawLoading(true)
    router.push("/user-levels/level-8/exchange/withdraw")

  }

  const login = () => {
    if(username === "richguyfr" && password === "ujioh298"){
        setIsLoggedIn(true)
    } else {
        window.alert("Invalid credentials")
        setUserName("")
        setPassword("")
    }
  }

  const logout = () => {
    setIsLogoutLoading(true)
    router.push("/woohoo?level=8")
    setUserName("");
    setPassword("");
  }

  const dummyTrades = [
    { id: 1, coin: "BTC", amount: 0.5, price: 50000, total: 25000 },
    { id: 2, coin: "ETH", amount: 10, price: 3000, total: 30000 },
    { id: 3, coin: "DOGE", amount: 10000, price: 0.1, total: 1000 },
  ];

  return (
    <div className="text-white min-h-screen flex flex-col items-center bg-gray-800 py-16 px-4 relative">
      <div className={"text-4xl mt-3 mb-8 " + bit.className}>Cryptexchange </div>
      {isLoggedIn ? (
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className=" p-4 mb-8">
            <h2 className="text-2xl font-bold">Welcome, RichGuy!</h2>
            
          </div>
          <div className="text-xl mb-6">Your balance is 14470 USDT</div>
          <div className="flex justify-center w-full mb-8">
            <button onClick={withdraw} className="flex justify-center items-center bg-yellow-500 h-12 w-40 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
              {isWithdrawLoading?<Loader />:"Withdraw funds"}
            </button>

          </div>
          <div className="w-full mb-8">
            <h3 className="text-xl font-bold mb-4">Quick Trade</h3>
            <div className="flex gap-4">
              <Input className="text-black" disabled     type="number" placeholder="Amount" />
              <select className="bg-gray-700 rounded p-2">
                <option>BTC</option>
                <option>ETH</option>
                <option>DOGE</option>
              </select>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Buy
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sell
              </button>
            </div>
          </div>
          <div className="w-full mb-16">
            <h3 className="text-xl font-bold mb-4">Recent Trades</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Coin</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {dummyTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td>{trade.coin}</td>
                    <td>{trade.amount}</td>
                    <td>${trade.price}</td>
                    <td>${trade.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
        onClick={logout}
        className="flex w-20 h-8  justify-center items-center absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >

       {isLogoutLoading?<Loader />:"Logout"}  
      </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className={"text-3xl " + bit.className}>Sign In</div>
          <div className="flex flex-col justify-center rounded-md px-6 py-8 bg-gray-700 w-[30rem] h-[20rem]">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              className="mt-2 text-black"
              type="text"
              id="username"
              placeholder="Username"
            />
            <Label className="mt-10" htmlFor="password">
              Password
            </Label>
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 text-black"
              type="password"
              id="password"
              placeholder="Password"
            />
            <button
              onClick={login}
              className={
                "bg-yellow-500 text-sm flex items-center justify-center self-center mt-10 w-[10rem] z-[999999] h-10 px-4 py-2 rounded-3xl hover:bg-yellow-700 hover:cursor-pointer transition-all " +
                bit.className
              }
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client'

import { FormEvent } from "react";
import { bit } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { callApi } from "@/app/utils/functions";


const products = [
  { id: 1, name: 'Trezor Safe', price: 150, image: '/wallets/trezor.png' },
  { id: 2, name: 'Safepal X1', price: 100, image: '/wallets/safepal.png' },
  { id: 3, name: 'Nano X Onchain', price: 160, image: '/wallets/nano.png' },
  { id: 4, name: 'Tangem Wallet', price: 90, image: '/wallets/tangem.png' },

  // Add more products as needed
];

export default function ExplorePage() {

    const router = useRouter()
    const {address} = useAccount()

    const answerCheck = async(id:Number)=>{

        if(id===3){
          router.push("/woohoo?level=3")
          return
          
        }
        
        else{
          await callApi(address, 3)
          router.push("/pwned") 
        }
        


    }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900"><span className=" text-red-500">Remove</span> 1 product</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center justify-center h-48 bg-gray-200 rounded-md">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-xl font-semibold text-yellow-500">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-gray-50">
                    <button onClick={()=>answerCheck(product.id)} className="w-full text-white bg-red-500 hover:bg-red-700  font-bold py-2 px-4 rounded">
                      <span className={bit.className + " text-xs"}>Remove from cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
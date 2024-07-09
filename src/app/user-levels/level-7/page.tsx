'use client'

import { callApi } from '@/app/utils/functions';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

export default function MyComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const router = useRouter()
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const {address} = useAccount()

  const openPopup = () => {

    const popup = window.open(
      "/user-levels/level-7/metamask",
      "_blank",
      "scrollbars=no,resizable=no,top=70,left=800,width=400,height=555 status=no titlebar=no"
    );
    if (popup) {
      popupRef.current = popup;
      setIsPopupOpen(true);
      
    }
  };
  useEffect(() => {
    const handleMessage = (event:MessageEvent) => {
      if (event.data.type === "REDIRECT") {
        router.push(event.data.url);
      }
    };
  
    window.addEventListener("message", handleMessage);
  
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (expanded) {
      timer = setTimeout(() => {
        openPopup();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    if (isPopupOpen && popupRef.current) {
      const checkIfClosed = setInterval(() => {
        if (popupRef.current?.closed) {
          clearInterval(checkIfClosed);
          setIsLoading(true)
          setIsPopupOpen(false);
          callApi(address, 7)
          console.log("Popup was closed");
          router.push("/woohoo?level=7")
          
        }
      }, 1000);

      return () => clearInterval(checkIfClosed);
    }
  }, [isPopupOpen]);

  return (
    <div className="pt-24 min-h-screen bg-gray-100 py-6 flex flex-col justify-center ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">Random Security Site</h1>
          
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-3">Blockchain Security: Protecting the Future of Finance</h2>
            <p className="mb-4">
              Blockchain technology has revolutionized the way we think about digital transactions and data storage. 
              However, with great innovation comes great responsibility, especially in terms of security.
            </p>
            
            {expanded && (
              <>
                <p className="mb-4">
                  One of the primary security features of blockchain is its decentralized nature. Unlike traditional 
                  centralized systems, there's no single point of failure that hackers can target. Each transaction 
                  is verified by multiple nodes in the network, making it extremely difficult to manipulate or fake transactions.
                </p>
                <p className="mb-4">
                  Cryptography plays a crucial role in blockchain security. Each transaction is secured using advanced 
                  cryptographic techniques, ensuring that once data is recorded, it cannot be altered without detection.
                </p>
                <p>
                  However, blockchain isn't without its vulnerabilities. Smart contract bugs, 51% attacks, and private 
                  key theft are just a few of the potential security risks that developers and users need to be aware of.
                </p>
              </>
            )}
            
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="mt-4 w-32 h-12 flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading?(<Loader />): expanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
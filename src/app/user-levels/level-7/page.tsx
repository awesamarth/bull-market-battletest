'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function MyComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const router = useRouter()

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
    if (isPopupOpen && popupRef.current) {
      const checkIfClosed = setInterval(() => {
        if (popupRef.current?.closed) {
          clearInterval(checkIfClosed);
          setIsPopupOpen(false);
          console.log("Popup was closed");
        //   router.push("/woohoo?level=7")
          
        }
      }, 1000);

      return () => clearInterval(checkIfClosed);
    }
  }, [isPopupOpen]);

  return (
    <div>
      <button className='pt-20' onClick={openPopup}>Open Popup</button>
      {isPopupOpen && <p>Popup is open</p>}
    </div>
  );
}
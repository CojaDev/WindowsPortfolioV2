import Image from 'next/image';
import React from 'react';
import { useState, useRef } from 'react';

const LockScreen = () => {
  const [isLocked, setIsLocked] = useState(true);
  const LockScreen = useRef();
  return (
    <section
      className={`LockScreen relative w-screen h-screen flex flex-col gap-4 justify-center items-center bg-black/90 z-50  ${
        isLocked ? 'active' : ''
      }`}
      ref={LockScreen}
    >
      <div className="absolute inset-0 z-10 flex flex-col gap-4 justify-center items-center mb-20">
        <Image
          src="/img/user.jpg"
          alt="me"
          height={564}
          width={564}
          draggable={false}
          className="w-[210px] h-[210px] rounded-full"
        />
        <p className="text-white font-sans text-5xl">Coja</p>
        <div
          className="p-[2px] text-white border-2 mt-2  bg-[#505050]/60 transition-all active:scale-95"
          onClick={() => {
            setIsLocked(false);
            setTimeout(() => {
              LockScreen.current.style.display = 'none';
            }, 290);
          }}
        >
          <p className="px-7 py-1 hover:border-white/60 transition-colors border border-transparent">
            Sign In
          </p>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/bg2.jpg"
          alt="Lock Screen"
          width={1920}
          height={1080}
          draggable={false}
          className="object-cover filter blur-sm"
        />
      </div>
    </section>
  );
};

export default LockScreen;

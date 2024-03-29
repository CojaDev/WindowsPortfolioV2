'use client';
import ContextMenu from '@/components/ContextMenu';
import Desktop from '@/components/Desktop';
import LockScreen from '@/components/LockScreen';
import Taskbar from '@/components/Taskbar';

import { useState } from 'react';

export default function Home() {
  let [num, setnum] = useState(0);
  const changebg = () => {
    const nextBgNum = (num + 1) % 4;
    setnum(nextBgNum);
  };
  return (
    <main className="h-screen w-screen overflow-hidden relative select-none">
      <div className="absolute top-0 right-0 w-screen h-screen select-none z-0">
        <img
          src={`/img/bg${num}.jpg`}
          alt="bg"
          loading="lazy"
          draggable={false}
          className="absolute top-0 right-0  w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
      <div className="nightLight h-screen w-screen bg-orange-950/25 absolute z-50 " />
      <LockScreen />
      <Desktop />
      <Taskbar />
      <ContextMenu changebg={changebg} />
    </main>
  );
}

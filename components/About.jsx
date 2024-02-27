'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

const About = ({ onClose, id = 'About' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const About = useRef();
  const handleClose = () => {
    if (onClose) onClose();
    else About.current.classList.remove('active');
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      requestAnimationFrame(() => {
        let left = e.clientX - offset.x;
        let top = e.clientY - offset.y;

        setPosition({ left, top });
      });
    }
  };
  return (
    <div
      className=" absolute w-[650px] h-[550px] bg-white left-[37%] top-[28%] translate-x-[-50%] translate-y-[-50%]  flex flex-col "
      style={{
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
      id={id}
      ref={About}
    >
      <div
        className="topbar h-[30px] flex justify-between w-full bg-black/95"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className=" ml-1 start flex items-center">
          <Image
            src="/img/settings.png"
            width={22}
            height={22}
            alt="icon"
            draggable="false"
          />

          <p className="text-xs  text-white ml-1 font-sans">About</p>
        </div>
        <div className="end flex items-center overflow-hidden">
          <div className="action close px-1.5" onClick={handleClose}>
            <p>X</p>
          </div>
        </div>
      </div>
      <div className="app-content w-full px-14">
        <h1 className="text-md font-sans mt-7 text-blue-600">
          View basic information about your computer
        </h1>
        <div className="flex w-full mt-2 mb-2 items-center gap-1">
          <p className="text-xs font-sans">Windows Edition</p>
          <hr className=" bg-black brightness-75  flex-1 h-[1.5px]" />
        </div>
        <div className="px-4 w-full flex flex-col gap-1.5">
          <p className="text-xs font-sans">Windows 10 Portfolio</p>
          <p className="text-xs font-sans">©CojaDev. All Rights Reserved.</p>
        </div>
        <div className="flex w-full mt-2 mb-2 items-center gap-1">
          <p className="text-xs font-sans">System</p>
          <hr className=" bg-black brightness-75  flex-1 h-[1.5px]" />
        </div>

        <div className="px-4 w-full flex flex-col gap-1.5">
          <div className="flex w-full  ">
            <p className="text-xs font-sans w-40">Processor:</p>
            <p className="text-xs font-sans flex-1 ">
              AMD Ryzen 7 5800X Eight-Core Processor
            </p>
            <p className="text-xs font-sans  ">3.80 GHz</p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Installed memory (RAM):</p>
            <p className="text-xs font-sans flex-1">64.0 GB</p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">System type:</p>
            <p className="text-xs font-sans flex-1">
              64-bit Operating System, x64-based processor
            </p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Pen and Touch:</p>
            <p className="text-xs font-sans flex-1">
              No Pen or Touch Input is available for this Display
            </p>
          </div>
        </div>

        <div className="flex w-full mt-2 mb-2 items-center gap-1">
          <p className="text-xs font-sans">
            Computer name, domain, and workgroup settings
          </p>
          <hr className=" bg-black brightness-75  flex-1 h-[1.5px]" />
        </div>

        <div className="px-4 w-full flex flex-col gap-1.5">
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Computer name:</p>
            <p className="text-xs font-sans flex-1">DESKTOP-KOSSRB3</p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Full computer name:</p>
            <p className="text-xs font-sans flex-1"> DESKTOP-KOSSRB3</p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Computer description:</p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Workgroup:</p>
            <p className="text-xs font-sans flex-1">WORKGROUP</p>
          </div>
        </div>

        <div className="flex w-full mt-2 mb-2 items-center gap-1">
          <p className="text-xs font-sans">Windows activation</p>
          <hr className=" bg-black brightness-75  flex-1 h-[1.5px]" />
        </div>

        <div className="px-4 w-full flex flex-col gap-1.5">
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Windows is activated</p>
            <p className="text-xs font-sans flex-1 text-blue-600">
              Read the Microsoft Software License Terms
            </p>
          </div>
          <div className="flex  ">
            <p className="text-xs font-sans w-40">Product ID:</p>
            <p className="text-xs font-sans flex-1">58731-43577-23754-BB331</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

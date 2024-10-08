'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Explorer from './Explorer';
import { apps2 } from '@/constants/desktop';

const Window2 = ({ activeApp, onClose, appName, appImg }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleClose = () => {
    onClose(activeApp);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const windowRef = useRef(null);
  const resizeButton = useRef(null);

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

  const [isMaximized, setIsMaximized] = useState(false);
  const resizeWindow = () => {
    if (resizeButton.current.classList.contains('maximize')) {
      minimizeWindow();
    } else {
      maximizeWindow();
    }
  };

  const minimizeWindow = () => {
    const windowElement = windowRef.current;
    if (windowElement) {
      windowElement.style.width = '1100px';
      windowElement.style.height = '700px';
      resizeButton.current.classList.remove('maximize');
      resizeButton.current.classList.add('minimize');
      setIsMaximized(false);
    }
  };

  const maximizeWindow = () => {
    const windowElement = windowRef.current;
    if (windowElement) {
      windowElement.style.width = '100%';
      windowElement.style.height = '100% ';

      resizeButton.current.classList.add('maximize');
      resizeButton.current.classList.remove('minimize');
      let left = -320;
      let top = -112;
      setPosition({ left, top });
      setIsMaximized(true);
    }
  };

  const getAppContent = () => {
    switch (activeApp) {
      case 1:
        const explorerTask = document.querySelector('.task.explorer');
        explorerTask.classList.add('active');
        return <Explorer list={apps2} title={'Applications'} open={true} />;
      case 2:
        const chromeTask = document.querySelector('.task.google');
        chromeTask.classList.add('active');
        return (
          <div className=" w-full h-full">
            <img
              src={isMaximized ? '/img/google1.png' : '/img/google2.png'}
              className="h-full w-full object-cover select-none"
              draggable={false}
              alt="google"
            />
          </div>
        );
      case 3:
        const vscTask = document.querySelector('.task.vsc');
        vscTask.classList.add('active');
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://gitlab1s.com/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 4:
        const wordTask = document.querySelector('.task.word');
        wordTask.classList.add('active');
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://www.google.com/docs/about/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 5:
        const explorerTask2 = document.querySelector('.task.explorer');
        explorerTask2.classList.add('active');
        return <Explorer list={projects} title={'Folder'} open={true} />;
      case 6:
        const wordTask2 = document.querySelector('.task.word');
        wordTask2.classList.add('active');
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://portfolio-coja.vercel.app/#contact"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 7:
        const wordTask3 = document.querySelector('.task.word');
        wordTask3.classList.add('active');
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://portfolio-coja.vercel.app/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 8:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://itch.io/embed-upload/6417999?color=252525"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 9:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://itch.io/embed-upload/6480912?color=252525"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 10:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://itch.io/embed-upload/6413683?color=252525"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 11:
        return <Explorer list={recyclebin} title={'Bin'} open={false} />;
      case 12:
        const gitTask = document.querySelector('.task.github');
        gitTask.classList.add('active');
        return (
          <div className=" w-full h-full">
            <a href="https://github.com/CojaDev" target="blank">
              <img
                src={isMaximized ? '/img/git.png' : '/img/git2.png'}
                alt="git"
                className="object-cover"
                draggable={false}
              ></img>
            </a>
          </div>
        );
      case 13:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://restorani-subotica.vercel.app/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 14:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://amedia-five.vercel.app/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 15:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://sharemecoja.netlify.app/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 16:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://cojadev.github.io/photoPortfolio/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 17:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://cojadev.github.io/Odgajivacnica-v.3/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case 18:
        return (
          <div className=" w-full h-full">
            <iframe
              frameborder="0"
              src="https://cuberun-seven.vercel.app/"
              allowfullscreen="true"
              className="w-full h-full"
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute left-80  top-28 w-[1280px] h-[740px] shadow-sm shadow-white/10  bg-[#252525] "
      ref={windowRef}
      style={{
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
    >
      <div
        className="topbar h-[30px] flex justify-between w-full bg-black/95"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className=" ml-1 start flex items-center">
          <Image
            src={appImg}
            width={22}
            height={22}
            alt="icon"
            draggable="false"
          />

          <p className="text-xs  text-white ml-1 font-sans capitalize">
            {appName}
          </p>
        </div>
        <div className="end flex items-center overflow-hidden">
          <div
            className="action minimize px-1.5"
            onClick={() => setIsMinimized(true)}
          >
            <p className=" text-lg" onClick={handleClose}>
              ─
            </p>
          </div>
          <div
            className="action resize px-1.5"
            ref={resizeButton}
            onClick={resizeWindow}
          >
            <p className="text-xl">◻</p>
          </div>
          <div className="action close px-1.5" onClick={handleClose}>
            <p>X</p>
          </div>
        </div>
      </div>

      <div className="app-content w-full  overflow-auto">
        {!isMinimized && getAppContent()}
      </div>
    </div>
  );
};

export default Window2;

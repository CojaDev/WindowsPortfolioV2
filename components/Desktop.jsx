'use client';
import { useState, useEffect, useRef } from 'react';
import { apps } from '@/constants/desktop';
import Image from 'next/image';
import Window from './Window';
import About from './About';

const Desktop = () => {
  const [activeApp, setActiveApp] = useState(null);
  const [openApp, setOpenApp] = useState(null);
  const [appInfo, setAppInfo] = useState(null);
  const desktopRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startMousePos = useRef({ x: 0, y: 0 });
  const selectRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (e) => {
      setActiveApp(null);
      startMousePos.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      requestAnimationFrame(() => {
        const select = selectRef.current;
        if (select) {
          select.style.left = `${Math.min(
            startMousePos.current.x,
            e.clientX
          )}px`;
          select.style.top = `${Math.min(
            startMousePos.current.y,
            e.clientY
          )}px`;
          select.style.width = `${Math.abs(
            e.clientX - startMousePos.current.x
          )}px`;
          select.style.height = `${Math.abs(
            e.clientY - startMousePos.current.y
          )}px`;
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    desktopRef.current.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (openApp) {
      // Find the app object with the corresponding ID
      const foundApp = apps.find((app) => app.id === openApp);
      if (foundApp) {
        // Set the app name and image to the state
        setAppInfo({ name: foundApp.name, img: foundApp.img });
      }
    } else {
      // Reset app info when openApp is null
      setAppInfo(null);
    }
  }, [openApp]);

  const onClose = (App) => {
    switch (App) {
      case 1:
        const explorer = document.querySelector('.task.explorer');
        explorer.classList.remove('active');
        setOpenApp(null);
        break;
      case 2:
        const chromeTask = document.querySelector('.task.google');
        chromeTask.classList.remove('active');
        setOpenApp(null);
        break;
      case 3:
        const vscTask = document.querySelector('.task.vsc');
        vscTask.classList.remove('active');
        setOpenApp(null);
        break;
      case 4:
        const wordTask = document.querySelector('.task.word');
        wordTask.classList.remove('active');
        setOpenApp(null);
        break;
      case 5:
        const explorer2 = document.querySelector('.task.explorer');
        explorer2.classList.remove('active');
        setOpenApp(null);
        break;
      case 6:
        const word2 = document.querySelector('.task.word');
        word2.classList.remove('active');
        setOpenApp(null);
        break;
      case 7:
        const word3 = document.querySelector('.task.word');
        word3.classList.remove('active');
        setOpenApp(null);
        break;

      default:
        setOpenApp(null);
        break;
    }
  };

  const handleIconClick = (app) => {
    setActiveApp(app.id);
  };

  const handleIconDoubleClick = (app) => {
    setOpenApp(app.id);
  };

  const games = apps.filter((app) => app.style === 'game');
  const recycleBin = apps.find((app) => app.style === 'trash');
  const otherApps = apps.filter(
    (app) => app.style !== 'game' && app.style !== 'trash'
  );

  return (
    <section
      className="desktop pl-0.5 pt-2 pr-4 w-full  absolute flex"
      id="desktop"
      ref={desktopRef}
    >
      <div className="flex flex-col">
        {otherApps.map((app) => (
          <div
            className={`icon w-[85px] h-[80px] flex flex-col justify-center items-center mb-4 ${
              app.style
            } ${activeApp === app.id ? 'active' : ''}`}
            key={app.id}
            onClick={() => handleIconClick(app)}
            onDoubleClick={() => handleIconDoubleClick(app)}
          >
            <Image
              src={app.img}
              alt={app.name}
              width={512}
              height={512}
              draggable={false}
              className="w-[40px] h-[40px] select-none"
            />
            <p className="text-white font-light font-sans text-sm text-wrap select-none leading-[1.15] text-center">
              {app.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col ml-auto">
        {games.map((app) => (
          <div
            className={`icon w-[85px] h-[80px] flex flex-col justify-center items-center mb-4 ${
              app.style
            } ${activeApp === app.id ? 'active' : ''}`}
            key={app.id}
            onClick={() => handleIconClick(app)}
            onDoubleClick={() => handleIconDoubleClick(app)}
          >
            <Image
              src={app.img}
              alt={app.name}
              width={512}
              height={512}
              draggable={false}
              className="w-[40px] h-[40px] select-none"
            />
            <p className="text-white font-light drop-shadow-md  shadow-black font-sans text-sm text-wrap select-none leading-[1.15] text-center brightness-[0.975]">
              {app.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {recycleBin && (
          <div
            className={`icon w-[85px] h-[80px] flex flex-col justify-center items-center mb-4 ${
              recycleBin.style
            } ${activeApp === recycleBin.id ? 'active' : ''}`}
            key={recycleBin.id}
            onClick={() => handleIconClick(recycleBin)}
            onDoubleClick={() => handleIconDoubleClick(recycleBin)}
            style={{ position: 'absolute', bottom: 10, right: 10 }}
          >
            <Image
              src={recycleBin.img}
              alt={recycleBin.name}
              width={512}
              height={512}
              draggable={false}
              className="w-[40px] h-[40px] select-none"
            />
            <p className="text-white font-light drop-shadow-md  shadow-black font-sans text-sm text-wrap select-none leading-[1.15] text-center brightness-[0.975]">
              {recycleBin.name}
            </p>
          </div>
        )}
      </div>

      {isDragging && (
        <div
          className="select border -top-4 border-blue-500/90 bg-blue-400/30 absolute"
          ref={selectRef}
        />
      )}
      <About id="About2" />
      {/* Pass appName and appImg props to the Window component */}
      {openApp && appInfo && (
        <Window
          activeApp={openApp}
          onClose={onClose}
          appName={appInfo.name}
          appImg={appInfo.img}
        />
      )}
    </section>
  );
};

export default Desktop;

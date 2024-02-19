'use client';
import { apps2 } from '@/constants/desktop';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Window2 from './Window2';

const Explorer = ({ list, title, open }) => {
  const [openApps, setOpenApps] = useState([]);
  const toggleWindow = (appId, appLabel, appImg) => {
    // Check if the window is already open
    if (open) {
      const isOpen = openApps.some((app) => app.id === appId);

      if (isOpen) {
        // If the window is already open, close it
        setOpenApps((prevOpenApps) =>
          prevOpenApps.filter((app) => app.id !== appId)
        );

        // Remove active class from the corresponding task
        const task = document.querySelector(`.task.${appLabel}`);
        if (task) {
          task.classList.remove('active');
        }
      } else {
        // If the window is not open, open it
        setOpenApps((prevOpenApps) => [
          ...prevOpenApps,
          { id: appId, label: appLabel, img: appImg },
        ]);

        // Add active class to the corresponding task
        const task = document.querySelector(`.task.${appLabel}`);
        if (task) {
          task.classList.add('active');
        }
      }
    }
  };

  const onClose = (appId) => {
    setOpenApps((prevOpenApps) =>
      prevOpenApps.filter((app) => app.id !== appId)
    );

    // Remove active class from the corresponding task
    const app = openApps.find((app) => app.id === appId);
    if (app) {
      const task = document.querySelector(`.task.${app.label}`);
      if (task) {
        task.classList.remove('active');
      }
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="topnav px-5 w-full max-h-9 overflow-hidden items-center  bg-black/20 flex">
        <div className=" p-2 text-lg text-white/50 hover:bg-white/10 transition-all rotate-180">
          ➜
        </div>
        <div className=" p-2 text-lg text-white/50 hover:bg-white/10 transition-all">
          ➜
        </div>
        <div className=" p-2 h-full font-medium flex items-center text-white hover:bg-white/10 transition-all">
          <p className="text-xs">▼</p>
        </div>
        <div className=" p-2  text-lg text-white hover:bg-white/10 transition-all mr-1">
          <p className="-rotate-90">➜</p>
        </div>
        <div className="border-white/30 border w-[60%] flex items-center gap-1">
          <img
            src="/img/thispc.png"
            alt="pc"
            draggable={false}
            className="w-[20px] h-[20px] ml-0.5"
          />
          <input
            type="text"
            placeholder="This Pc"
            className="font-sans text-xs text-white  p-0.5 w-full  focus:outline-none bg-transparent"
          />
          <div className=" px-1 h-full  flex items-center  hover:bg-blue-400/20 transition-all">
            <p className="text-xs font-medium text-white">▼</p>
          </div>

          <div className=" px-1 text-md text-white hover:bg-blue-400/20   transition-all">
            ↻
          </div>
        </div>
        <div className="border-white/30 border w-[40%] flex  items-center gap-1 ml-3">
          <input
            type="text"
            placeholder="Search This PC"
            className="font-sans text-xs text-white   p-0.5 w-full  focus:outline-none bg-transparent"
          />
          <div className="  px-1 text-md font-light  text-white hover:bg-blue-400/20   transition-all bg-">
            🔎︎
          </div>
        </div>
      </div>

      <div className="apptray w-full px-10 py-2 flex flex-col">
        <h2 className="text-md font-sans text-white mb-4 mt-2">{title} ▼</h2>
        <div className="appgrid flex w-full flex-wrap gap-3">
          {list.map((app) => (
            <div
              className={`icon w-[135px] h-[130px] flex flex-col justify-center items-center mb-4 `}
              key={app.id}
              onDoubleClick={() => toggleWindow(app.id, app.name, app.img)}
            >
              <Image
                src={app.img}
                alt={app.name}
                width={512}
                height={512}
                draggable={false}
                className="w-[65px] h-[65px] select-none"
              />
              <p className="text-white font-light font-sans py-1.5 text-sm text-wrap select-none leading-[1.15] text-center">
                {app.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {openApps.map((app) => (
        <Window2
          key={app.id}
          activeApp={app.id}
          onClose={() => onClose(app.id)}
          appName={app.label}
          appImg={app.img}
        />
      ))}
    </div>
  );
};

export default Explorer;

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import startBtn from '../public/img/startMenu.png';
import startBtnBlue from '../public/img/logo.png';
import { INFO, TASKS } from '@/constants/tasks';
import Startmenu from './Startmenu';
import Window from './Window';
import NotifBar from './NotifBar';

const Taskbar = () => {
  const [openApps, setOpenApps] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [ShowNotif, setShowNotif] = useState(false);

  const ClockCalendar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedDate = currentTime.toLocaleDateString();

    return (
      <div className="text-white font-sans text-xs text-center px-1">
        <p>{formattedTime}</p>
        <p>{formattedDate}</p>
      </div>
    );
  };

  const toggleWindow = (appId, appLabel, appImg) => {
    // Check if the window is already open
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
  };

  const openWindowInDesktop = (appId, appLabel, appImg) => {
    setOpenApps((prevOpenApps) => [
      ...prevOpenApps,
      { id: appId, label: appLabel, img: appImg },
    ]);
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
  const toggleNotifbar = (info) => {
    if (info.key === '6') {
      setTimeout(() => {
        setShowNotif(!ShowNotif);
      }, 30);
    }
  };
  return (
    <>
      <section className="absolute flex bottom-0 left-0 w-full h-[40px] max-h-[40px]  bg-[#1a1a1a]/80">
        <div
          className="startBtn"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsToggled(!isToggled)}
        >
          <Image
            src={isHovered ? startBtnBlue : startBtn}
            alt="startbtn"
            width={1277}
            height={1282}
            draggable={false}
            className="h-[17px] w-[17px] select-none"
          />
        </div>
        {TASKS.map((task) => (
          <div
            className={`task ${task.label}`}
            key={task.key}
            onClick={() => toggleWindow(task.key, task.label, task.img)}
          >
            <Image
              src={task.img}
              alt="tasks"
              width={512}
              height={512}
              draggable={false}
              className="h-[25px] w-[25px] select-none"
            />
          </div>
        ))}
        <div className="ml-auto flex">
          {INFO.map((info) => (
            <div
              className={`info ${info.size}`}
              key={info.key}
              onClick={() => toggleNotifbar(info)}
            >
              {info.img !== '' ? (
                <Image
                  src={info.img}
                  alt="infos"
                  width={512}
                  height={512}
                  draggable={false}
                  className="h-[21px] w-[21px] select-none "
                />
              ) : info.key === '5' ? (
                <ClockCalendar />
              ) : (
                <p className="text-white font-sans px-1 text-xs">
                  {info.label}
                </p>
              )}
            </div>
          ))}
          <div className=" h-[40px] w-[5px] border-l ml-2  border-white/50 line" />
        </div>
        {isToggled && <Startmenu openWindowInDesktop={openWindowInDesktop} />}

        <NotifBar
          isVisible={ShowNotif}
          onHide={() => {
            setTimeout(() => {
              setShowNotif(!ShowNotif);
            }, 30);
          }}
        />
      </section>
      {openApps.map((app) => (
        <Window
          key={app.id}
          activeApp={app.id}
          onClose={() => onClose(app.id)}
          appName={app.label}
          appImg={app.img}
        />
      ))}
    </>
  );
};

export default Taskbar;

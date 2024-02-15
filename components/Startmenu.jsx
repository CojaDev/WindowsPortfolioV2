import { Apps, SETTINGS } from '@/constants/Start';
import Image from 'next/image';
import React from 'react';

const Startmenu = ({ openWindowInDesktop }) => {
  const handleClick = (appId, appLabel, appImg) => {
    openWindowInDesktop(appId, appLabel, appImg);
  };

  return (
    <div className="absolute bottom-[40px] left-0 h-[500px] w-[400px] bg-[#00558e] shadow-sm shadow-black/60 flex gap-1 p-2">
      <div className="apps bg-white min-w-[245px] border-2 border-black/70 flex flex-col p-0.5">
        {Apps.map((app) => (
          <div
            className="app w-full flex h-[40px]  items-center transition-all active:scale-[0.98] "
            key={app.key}
            onClick={() => handleClick(app.key, app.label, app.img)}
          >
            <Image
              src={app.img}
              alt="icon"
              width={512}
              height={512}
              className="w-[30px] h-[30px] ml-2"
            />
            <p className="text-xs font-sans ml-1">{app.text}</p>
          </div>
        ))}
      </div>
      <div className="right w-full flex flex-col  h-full pt-7">
        {SETTINGS.map((sett) => (
          <>
            {sett.label !== 'split' ? (
              <div
                className="settings w-full h-[30px] px-2 py-1.5 flex justify-start items-start transition-all"
                key={sett.key}
              >
                <p className="text-white text-xs font-sans">{sett.label}</p>
              </div>
            ) : (
              <div
                className=" w-full   my-0.5 flex justify-start items-start transition-all"
                key={sett.key}
              >
                <hr className="w-full opacity-60" />
              </div>
            )}
          </>
        ))}
      </div>
      <div className="shutdown absolute bottom-4 right-11 w-[100px] transition-all border border-white/70 flex items-center">
        <p className="label text-white text-xs font-sans transition-all ml-2 h-full py-[0.22rem] pr-2 border-r border-white/70">
          Shut Down
        </p>
        <p className="text-white text-[0.60rem]  font-sans  h-full ml-2  rotate-90">
          ▲
        </p>
      </div>
      <div className="Profile w-[55px] h-[55px] absolute -top-7 right-[2.82rem] bg-white border border-black/70 p-0.5">
        <Image
          src="/img/user.jpg"
          alt="profile"
          width={564}
          draggable={false}
          height={564}
          className="object-cover border border-black/50"
        />
      </div>
    </div>
  );
};

export default Startmenu;

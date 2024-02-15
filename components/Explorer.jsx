import React from 'react';

const Explorer = () => {
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

      <div className="apptray w-full bg-white"></div>
    </div>
  );
};

export default Explorer;

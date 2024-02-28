import { OPTIONS } from '@/constants/tasks';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const NotifBar = ({ isVisible, onHide }) => {
  const [ShowNotification, setShowNotification] = useState(true);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [activeOptions, setActiveOptions] = useState(
    new Array(OPTIONS.length).fill(false)
  );
  const notifbar = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifbar.current && !notifbar.current.contains(e.target)) {
        onHide();
      }
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      const boundingRect = notifbar.current.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;
      setPosX(mouseX);
      setPosY(mouseY);
    };

    if (isVisible) {
      notifbar.current.style.transition = 'right 0.2s ease-in-out';
      notifbar.current.style.right = '0';
      notifbar.current.style.borderLeft = '1px solid rgba(255,255,255,0.1)';
      document.addEventListener('click', handleClickOutside);
      notifbar.current.addEventListener('mousemove', handleMouseMove);
    } else {
      notifbar.current.style.transition = 'right 0.3s ease-out';
      notifbar.current.style.right = '-400px';
      document.removeEventListener('click', handleClickOutside);
      notifbar.current.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      notifbar.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  const toggleActiveClass = (index) => {
    switch (index) {
      case 0:
        const about = document.querySelector('#About2');
        about.classList.toggle('active');
        break;
      case 2:
        const nightLight = document.querySelector('.nightLight');
        nightLight.classList.toggle('active');
        break;
    }
    setActiveOptions((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <div
        className="notifbar w-[400px] h-screen absolute bottom-[40px] -right-[400px] bg-[#222125] overflow-hidden pt-2"
        ref={notifbar}
      >
        <div
          className="glow absolute w-[20px] h-[16px] bg-white  blur-[40px] pointer-events-none select-none z-0"
          style={{ left: `${posX}px`, top: `${posY}px` }}
        />

        <div className="content bg-[#222125]/90 w-full h-full  flex flex-col-reverse px-2 pb-1 pt-2">
          <div className="options flex  h-[68px] gap-1 z-10">
            {OPTIONS.map((option, index) => (
              <div
                className={`option flex flex-col flex-1 h-full p-1 ${
                  activeOptions[index] ? 'active' : ''
                }`}
                key={option.key}
                onClick={() => toggleActiveClass(index)}
              >
                <Image
                  src={option.img}
                  alt={option.label}
                  height={20}
                  width={20}
                  className="invert"
                  draggable={false}
                />
                <p className="text-white text-xs  font-sans mt-auto">
                  {option.label}
                </p>
              </div>
            ))}
          </div>

          {ShowNotification ? (
            <div className="notification relative flex w-full h-28 gap-2  mb-auto mt-8 border bg-white/5 border-white/5 py-5  px-3">
              <Image
                src="/img/user.jpg"
                alt="me"
                height={564}
                width={564}
                className="w-[55px] h-[55px]"
                draggable={false}
              />
              <div className="msg text-white font-sans">
                <h3 className="font-medium">CojaDev</h3>
                <p className="opacity-70 ">Follow me on GitHub</p>
                <p className="text-sm opacity-70">1:04 AM</p>
              </div>
              <div
                className="close absolute top-1 right-1 p-2 px-3 opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => {
                  setShowNotification(false);
                }}
              >
                <p className="text-sm text-white ">X</p>
              </div>
            </div>
          ) : (
            <p className="text-white/90 m-auto font-sans opacity-80">
              No new notifications
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotifBar;

import { useEffect, useState, useRef } from 'react';

const NotifBar = ({ isVisible, onHide }) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
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

  return (
    <div
      className="notifbar w-[400px] h-screen absolute bottom-[40px] -right-[400px] bg-[#222125] overflow-hidden"
      ref={notifbar}
    >
      <div
        className="glow absolute w-[20px] h-[20px] bg-white z-10 blur-[45px]"
        style={{ left: `${posX}px`, top: `${posY}px` }}
      />
      <div className="content bg-[#222125]/90 w-full h-full z-20"></div>
    </div>
  );
};

export default NotifBar;

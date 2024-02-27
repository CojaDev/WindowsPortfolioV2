'use client';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import About from './About';

const ContextMenu = ({ changebg }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ShowAbout, setShowAbout] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const menu = useRef();

  useLayoutEffect(() => {
    if (isVisible && menu.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const menuWidth = menu.current.offsetWidth;
      const menuHeight = menu.current.offsetHeight;

      setPosX(Math.min(posX, windowWidth - menuWidth));
      setPosY(Math.min(posY, windowHeight - menuHeight));
    }
  }, [isVisible, posX, posY]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setIsVisible(true);
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setPosX(mouseX);
      setPosY(mouseY);
    };

    const closeContextMenu = (e) => {
      if (menu.current && !menu.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleContextMenu(e);
    });

    if (isVisible) {
      document.body.addEventListener('mousedown', closeContextMenu);
    }

    return () => {
      document.body.removeEventListener('contextmenu', (e) => {
        e.preventDefault();
        handleContextMenu(e);
      });

      document.body.removeEventListener('mousedown', closeContextMenu);
    };
  }, [isVisible]);
  const refresh = () => {
    let desktop = document.querySelector('#desktop');
    desktop.style.transition = 'opacity 0.1s ease-out';
    desktop.style.opacity = 0;

    setTimeout(() => {
      desktop.style.opacity = 1;
      setIsVisible(false);
    }, 100);
  };

  return (
    <>
      {ShowAbout && (
        <About
          onClose={() => {
            setShowAbout(false);
          }}
        />
      )}
      {isVisible && (
        <div
          ref={menu}
          className={`contextMenu w-[250px] font-sans font-extralight h-[250px] text-white bg-[#2b2b2b] border border-white z-30 transition-all delay-[10ms] gap-0.5 flex flex-col shadow-sm overflow-hidden px-1 py-0.5 shadow-black/80  select-none`}
          style={{ left: `${posX}px`, top: `${posY}px` }}
        >
          {/* Add your context menu items here */}
          <div className="menuItem" onClick={() => setIsVisible(false)}>
            View
          </div>
          <div className="menuItem" onClick={() => setIsVisible(false)}>
            Sort By
          </div>
          <div className="menuItem" onClick={refresh}>
            Refresh
          </div>
          <hr className="opacity-60" />
          <div
            className="menuItem"
            onClick={() => {
              setIsVisible(false);
              changebg();
            }}
          >
            Next Desktop Background
          </div>
          <div
            className="menuItem opacity-30"
            onClick={() => setIsVisible(false)}
          >
            Paste
          </div>
          <div
            className="menuItem opacity-30"
            onClick={() => setIsVisible(false)}
          >
            Paste shortcut
          </div>
          <div
            className="menuItem opacity-30"
            onClick={() => setIsVisible(false)}
          >
            Undo Delete
          </div>
          <hr className="opacity-60" />
          <div className="menuItem" onClick={() => setIsVisible(false)}>
            Personalize
          </div>
          <hr className="opacity-60" />
          <div
            className="menuItem"
            onClick={() => {
              setIsVisible(false);
              setShowAbout(true);
            }}
          >
            About
          </div>
        </div>
      )}
    </>
  );
};

export default ContextMenu;

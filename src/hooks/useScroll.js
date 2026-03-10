import { useState, useEffect } from "react";

export const useScroll = () => {
  const [y, setY] = useState(0);
  const [p, setP] = useState(0);
  
  useEffect(() => {
    const fn = () => {
      setY(window.scrollY);
      const d = document.documentElement.scrollHeight - window.innerHeight;
      setP(d > 0 ? window.scrollY / d : 0);
    };
    
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  return { y, p };
};

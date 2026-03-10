import { useState, useEffect, useRef } from "react";

export const useInView = (opts = {}) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  
  useEffect(() => {
    const el = ref.current; 
    if (!el) return;
    
    const o = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { 
        setV(true); 
        o.unobserve(el); 
      } 
    }, { 
      threshold: opts.t || 0.12, 
      rootMargin: opts.rm || "0px 0px -40px 0px" 
    });
    
    o.observe(el); 
    return () => o.disconnect();
  }, [opts.t, opts.rm]); 
  
  return [ref, v];
};

import { useState, useCallback, useRef } from "react";

/**
 * Observe an element for viewport intersection using a callback ref.
 *
 * Returns [callbackRef, isVisible].
 *
 * Why callback ref instead of useRef + useEffect:
 * Components that render a loading state first (e.g. BlogPost) attach the
 * ref to a DOM node that doesn't exist on first render. With useRef the
 * IntersectionObserver would see ref.current === null and never observe.
 * A callback ref fires every time React attaches/detaches the node,
 * guaranteeing the observer is set up when the real content mounts.
 */
export const useInView = (opts = {}) => {
  const [v, setV] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (node) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Already visible — no need to re-observe
      if (v) return;

      if (!node) return;

      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setV(true);
            o.disconnect();
            observerRef.current = null;
          }
        },
        {
          threshold: opts.t || 0.12,
          rootMargin: opts.rm || "0px 0px -40px 0px",
        }
      );

      o.observe(node);
      observerRef.current = o;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opts.t, opts.rm, v]
  );

  return [ref, v];
};

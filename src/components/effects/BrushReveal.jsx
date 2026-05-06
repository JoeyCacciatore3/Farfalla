import { useInView } from "../../hooks/useInView";

/**
 * Wraps content in a clip-path that animates from a small brushstroke shape
 * to the full bounding box when the section enters view. The result reads as
 * if the page is being painted in as you scroll.
 *
 * `direction`:
 *   "ltr" — stroke sweeps in from left
 *   "rtl" — stroke sweeps in from right
 *
 * Implementation note: clip-path with inset() animates cheaply on the GPU
 * and degrades gracefully (just shows the content) if unsupported. No JS
 * loop needed — the IntersectionObserver flip is enough.
 */
export const BrushReveal = ({ children, direction = "ltr", duration = 1.4, delay = 0 }) => {
  const [ref, vis] = useInView({ t: 0.12 });
  const collapsed = direction === "rtl"
    ? "inset(0 0 0 100%)"
    : "inset(0 100% 0 0)";
  return (
    <div
      ref={ref}
      style={{
        clipPath: vis ? "inset(0 0 0 0)" : collapsed,
        WebkitClipPath: vis ? "inset(0 0 0 0)" : collapsed,
        transition: `clip-path ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, -webkit-clip-path ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "clip-path",
      }}
    >
      {children}
    </div>
  );
};

export default BrushReveal;

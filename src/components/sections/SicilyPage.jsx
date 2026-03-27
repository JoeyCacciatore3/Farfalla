import { useEffect, useRef, useState } from "react";
import { sanitizeSVG, secureFetch } from "../../utils/security.js";
import "./SicilyPage.css";

export const SicilyPage = ({ th, isDark }) => {
  const mapRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");

  // Load SVG map with enterprise-grade security
  useEffect(() => {
    const loadSecureMap = async () => {
      try {
        const response = await secureFetch(import.meta.env.BASE_URL + "sicily-map.svg");
        const text = await response.text();
        
        // Apply security transformations
        const patched = text.replace('<svg class="map"', '<svg class="sicily-map"');
        const sanitized = sanitizeSVG(patched);
        
        setSvgContent(sanitized);
      } catch (error) {
        console.error('🚨 Failed to load Sicily map securely:', error);
        setSvgContent("");
      }
    };
    
    loadSecureMap();
  }, []);

  // Touch tooltip toggling
  useEffect(() => {
    if (!mapRef.current || !("ontouchstart" in window)) return;
    let activePin = null;
    let activeTip = null;
    const container = mapRef.current;

    const clearActive = () => {
      if (activeTip) {
        activeTip.style.opacity = "0";
        activeTip.style.transform = "translateY(8px) scale(.96)";
      }
      activePin = null;
      activeTip = null;
    };

    const handlePinClick = (e) => {
      const pin = e.target.closest(".loc");
      if (!pin) {
        clearActive();
        return;
      }
      e.preventDefault(); // Stop native behaviors like highlighting
      e.stopPropagation();

      const tip = pin.querySelector(".tip");
      if (!tip) return;

      if (activePin === pin) {
        // Toggle off if tapping the same pin
        clearActive();
      } else {
        // Switch to new pin
        clearActive();
        tip.style.opacity = "1";
        tip.style.transform = "translateY(0) scale(1)";
        activePin = pin;
        activeTip = tip;
      }
    };

    container.addEventListener("touchstart", handlePinClick, { passive: false });
    document.addEventListener("touchstart", clearActive, { passive: true });
    
    return () => {
      container.removeEventListener("touchstart", handlePinClick);
      document.removeEventListener("touchstart", clearActive);
    };
  }, [svgContent]);

  return (
    <div className="sicily-page">
      <div className="sicily-wrap">
        <header className="sicily-hdr">
          <h1 style={{ color: th.text }}>La Mia <em>Sicilia</em></h1>
          <p className="sicily-sub">dove tutto è cominciato</p>
        </header>

        <div className="sicily-frame">
          <div className="sicily-frame-inner" ref={mapRef}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>


      </div>

      <footer className="sicily-bio">
        <div className="sicily-bio-card" style={{
          background: isDark ? "rgba(30,28,24,.55)" : "rgba(255,255,255,.35)",
          borderColor: isDark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.5)",
        }}>
          <div className="sicily-dv" aria-hidden="true">✦</div>
          <p style={{ color: th.textSoft }}>
            Born under Palermo&apos;s golden domes, raised on arancini and sea salt.<br/>
            From the markets of Ballarò to Etna&apos;s shadow — here&apos;s where my story started.
          </p>
          <span className="sicily-sg">— con amore, dalla Sicilia</span>
        </div>
      </footer>
    </div>
  );
};

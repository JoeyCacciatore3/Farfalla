import { useEffect, useRef, useState } from "react";
import { sanitizeSVG, secureFetch } from "../../utils/security.js";
import "./SicilyPage.css";

export const SicilyPage = ({ th, isDark }) => {
  const mapRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");
  const [selectedTown, setSelectedTown] = useState(null);

  // Town data for the information section
  const towns = [
    {
      id: "palermo",
      name: "Palermo",
      subtitle: "My birthplace",
      description: "Golden domes, Ballarò markets & arancini",
      color: "#C2654A"
    },
    {
      id: "cefalu", 
      name: "Cefalù",
      subtitle: "Norman Cathedral",
      description: "Norman cathedral on golden sand, where mountains meet the sea",
      color: "#3D7E99"
    },
    {
      id: "agrigento",
      name: "Agrigento", 
      subtitle: "Valley of the Temples",
      description: "Valley of the Temples — ancient Greek columns guarding almond groves",
      color: "#C4A020"
    },
    {
      id: "etna",
      name: "Mount Etna",
      subtitle: "Active Volcano", 
      description: "Europe's tallest active volcano — fire, snow & vineyards on its slopes",
      color: "#D4503A"
    },
    {
      id: "taormina",
      name: "Taormina",
      subtitle: "Greek Theater",
      description: "Ancient theater with Etna backdrop — pearls, terraces & eternal views",
      color: "#5E7A3A"
    },
    {
      id: "trapani",
      name: "Trapani",
      subtitle: "Salt Windmill", 
      description: "Windmills & salt pans gleaming white, gateway to the Egadi Islands",
      color: "#8B6B3A"
    },
    {
      id: "marsala",
      name: "Marsala",
      subtitle: "Wine Country",
      description: "Fortified wine & sunset coast facing Africa",
      color: "#8B2252"
    },
    {
      id: "catania",
      name: "Catania",
      subtitle: "Elephant Fountain",
      description: "Black lava stone city with the elephant fountain at its heart",
      color: "#4A4A4A"
    },
    {
      id: "siracusa", 
      name: "Siracusa",
      subtitle: "Ancient Amphora",
      description: "Greek theater, Ortigia & ancient stone",
      color: "#B8860B"
    },
    {
      id: "messina",
      name: "Messina",
      subtitle: "Bell Tower",
      description: "Gateway to the mainland with its astronomical clock tower",
      color: "#5B7FA5"
    }
  ];

  // Load SVG map 
  useEffect(() => {
    const loadMap = async () => {
      try {
        // Use standard fetch for local development, fallback to secureFetch for production
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const fetchFn = isLocal ? fetch : secureFetch;
        
        const response = await fetchFn(import.meta.env.BASE_URL + "sicily-map.svg");
        const text = await response.text();
        
        // Apply security transformations
        const patched = text.replace('<svg class="map"', '<svg class="sicily-map"');
        const sanitized = isLocal ? patched : sanitizeSVG(patched);
        
        setSvgContent(sanitized);
      } catch (error) {
        console.error('🚨 Failed to load Sicily map:', error);
        setSvgContent("");
      }
    };
    
    loadMap();
  }, []);

  // Handle town selection from map clicks
  useEffect(() => {
    if (!mapRef.current) return;
    
    const container = mapRef.current;

    const handleLocationClick = (e) => {
      const locationElement = e.target.closest(".loc");
      if (!locationElement) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Extract town info from aria-label
      const ariaLabel = locationElement.getAttribute("aria-label");
      if (!ariaLabel) return;
      
      // Extract town name from aria-label and normalize for matching
      const townName = ariaLabel.split(" — ")[0].toLowerCase().trim();
      
      const matchedTown = towns.find(town => {
        const normalizedTownName = town.name.toLowerCase();
        
        // Direct name matches
        if (townName.includes(normalizedTownName) || normalizedTownName.includes(townName)) {
          return true;
        }
        
        // ID matches
        if (town.id === townName) {
          return true;
        }
        
        // Special cases
        if ((townName.includes("mount") || townName.includes("monte") || townName.includes("mt.")) && town.id === "etna") {
          return true;
        }
        
        // Word-by-word matching for complex names
        const townWords = normalizedTownName.split(" ");
        const labelWords = townName.split(" ");
        
        return townWords.some(tWord => labelWords.some(lWord => lWord.includes(tWord) || tWord.includes(lWord)));
      });
      
      if (matchedTown) {
        setSelectedTown(matchedTown);
        // Smooth scroll to town info section
        setTimeout(() => {
          document.getElementById("town-info")?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
        }, 100);
      }
    };

    container.addEventListener("click", handleLocationClick);
    container.addEventListener("touchend", handleLocationClick, { passive: false });
    
    return () => {
      container.removeEventListener("click", handleLocationClick);
      container.removeEventListener("touchend", handleLocationClick);
    };
  }, [svgContent, towns]);

  return (
    <div className="sicily-page">
      <div className="sicily-wrap">
        <header className="sicily-hdr">
          <h1 style={{ color: th.text }}>La Mia <em>Sicilia</em></h1>
          <p className="sicily-sub">dove tutto è cominciato</p>
          <p className="sicily-eyebrow">where it all began</p>
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

      {/* Town Information Section */}
      {selectedTown && (
        <section id="town-info" className="town-info-section">
          <div className="town-info-card" style={{
            background: isDark ? "rgba(30,28,24,.65)" : "rgba(255,255,255,.45)",
            borderColor: selectedTown.color + "40",
          }}>
            <div className="town-info-header">
              <h3 style={{ color: selectedTown.color }}>
                {selectedTown.name}
              </h3>
              <p className="town-subtitle" style={{ color: th.textSoft }}>
                {selectedTown.subtitle}
              </p>
            </div>
            <p className="town-description" style={{ color: th.text }}>
              {selectedTown.description}
            </p>
            <button 
              className="town-close" 
              onClick={() => setSelectedTown(null)}
              style={{ 
                color: th.textSoft,
                background: "transparent",
                border: `1px solid ${selectedTown.color}30`,
              }}
              aria-label="Close town information"
            >
              ✕
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

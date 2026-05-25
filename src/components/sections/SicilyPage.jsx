import { useEffect, useRef, useState } from "react";
import { sanitizeSVG } from "../../utils/security.js";
import { useSEO } from "../seo/SEOOptimizer.jsx";
import "./SicilyPage.css";

// Hoisted outside the component — stable identity prevents the map-click
// useEffect from re-attaching event listeners every render.
const TOWNS = [
  { id: "palermo",   name: "Palermo",     subtitle: "My birthplace",         description: "Golden domes, Ballarò markets & arancini",                           color: "#C2654A" },
  { id: "cefalu",    name: "Cefalù",      subtitle: "Norman Cathedral",      description: "Norman cathedral on golden sand, where mountains meet the sea",       color: "#3D7E99" },
  { id: "agrigento", name: "Agrigento",    subtitle: "Valley of the Temples", description: "Valley of the Temples — ancient Greek columns guarding almond groves", color: "#C4A020" },
  { id: "etna",      name: "Mount Etna",   subtitle: "Active Volcano",        description: "Europe's tallest active volcano — fire, snow & vineyards on its slopes", color: "#D4503A" },
  { id: "taormina",  name: "Taormina",     subtitle: "Greek Theater",         description: "Ancient theater with Etna backdrop — pearls, terraces & eternal views", color: "#5E7A3A" },
  { id: "trapani",   name: "Trapani",      subtitle: "Salt Windmill",         description: "Windmills & salt pans gleaming white, gateway to the Egadi Islands",  color: "#8B6B3A" },
  { id: "marsala",   name: "Marsala",      subtitle: "Wine Country",          description: "Fortified wine & sunset coast facing Africa",                        color: "#8B2252" },
  { id: "catania",   name: "Catania",      subtitle: "Elephant Fountain",     description: "Black lava stone city with the elephant fountain at its heart",      color: "#4A4A4A" },
  { id: "siracusa",  name: "Siracusa",     subtitle: "Ancient Amphora",       description: "Greek theater, Ortigia & ancient stone",                             color: "#B8860B" },
  { id: "messina",   name: "Messina",      subtitle: "Bell Tower",            description: "Gateway to the mainland with its astronomical clock tower",           color: "#5B7FA5" },
  { id: "ragusa",    name: "Ragusa",       subtitle: "Baroque Dome",          description: "Twin-city of Baroque splendor — Ragusa Ibla cascades down a ravine",  color: "#A0522D" },
  { id: "enna",      name: "Enna",         subtitle: "Mountain Fortress",     description: "The navel of Sicily — a fortress city on the island's highest plateau", color: "#6B8E23" },
  { id: "scicli",    name: "Scicli",       subtitle: "Baroque Palace",        description: "Golden limestone and Baroque facades tucked into a rocky canyon",     color: "#CD853F" },
  { id: "marzamemi", name: "Marzamemi",    subtitle: "Fishing Village",       description: "A tiny fishing village with a piazza on the sea and tonnara ruins",   color: "#4682B4" },
  { id: "noto",      name: "Noto",         subtitle: "Baroque Capital",       description: "The golden city — honeyed limestone Baroque rebuilt after the earthquake", color: "#DAA520" },
];

export const SicilyPage = ({ th, isDark }) => {
  const mapRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");
  const [selectedTown, setSelectedTown] = useState(null);

  useSEO({
    title: "La Mia Sicilia — Milly Farfalla",
    description: "An interactive map of Sicily — the island where Milly Farfalla was born and finds inspiration for her art.",
    path: "/sicilia",
  });

  // Load SVG map 
  useEffect(() => {
    const loadMap = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + "sicily-map.svg");
        const text = await response.text();
        const patched = text.replace('<svg class="map"', '<svg class="sicily-map"');
        // sanitizeSVG strips event handlers + script tags from the SVG before
        // we feed it into dangerouslySetInnerHTML.
        setSvgContent(sanitizeSVG(patched));
      } catch (error) {
        console.error('Failed to load Sicily map:', error);
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
      
      const matchedTown = TOWNS.find(town => {
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
  }, [svgContent]);

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

      {/* Town Information — appears between map and bio when a town is selected */}
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

      <footer className="sicily-bio">
        <div className="sicily-bio-card" style={{
          background: isDark ? "rgba(30,28,24,.55)" : "rgba(255,255,255,.35)",
          borderColor: isDark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.5)",
        }}>
          {/*
            ✎ BIO — placeholder until Emilia provides her own words about Sicily.
            The previous copy was AI-fabricated voice. Do NOT rewrite it — wait
            for her input. Open question in the Emilia queue.
          */}
          <div className="sicily-dv" aria-hidden="true">✦</div>
          <p style={{ color: th.textSoft }}>
            Palermo, Sicilia.
          </p>
          <span className="sicily-sg">— con amore, dalla Sicilia</span>
        </div>
      </footer>
    </div>
  );
};

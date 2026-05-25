import { useInView } from "../../hooks/useInView";
import { GIARDINO } from "../../data/content";

export const GiardinoSection = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });

  return (
    <section id="giardino" ref={ref} style={{
      padding: "80px 28px 64px",
      maxWidth: 1100,
      margin: "0 auto",
    }}>
      {/* Section header */}
      <div style={{
        textAlign: "center",
        marginBottom: 48,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 300,
          color: th.text,
          margin: 0,
          letterSpacing: "0.02em",
        }}>
          Giardino
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          marginTop: 12,
          letterSpacing: "0.04em",
        }}>
          Emilia&apos;s garden — plants, tips, and seasonal notes
        </p>
      </div>

      {/* Garden content — populated when Emilia provides content */}
      {GIARDINO.length === 0 ? (
        <p style={{
          textAlign: "center",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          fontStyle: "italic",
          opacity: vis ? 0.7 : 0,
          transition: "opacity 1s ease 0.3s",
        }}>
          Garden content coming soon
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 28,
        }}>
          {GIARDINO.map((item, i) => (
            <article key={item.id} style={{
              background: th.surface,
              border: `1px solid ${th.border}`,
              borderRadius: 16,
              overflow: "hidden",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: 20 }}>
                {item.season && item.season !== "all" && (
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: th.accent,
                  }}>
                    {item.season}
                  </span>
                )}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 500,
                  color: th.text,
                  margin: "4px 0 8px",
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: th.textSoft,
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

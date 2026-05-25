import { useInView } from "../../hooks/useInView";
import { CUCINA } from "../../data/content";

export const CucinaSection = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });

  return (
    <section id="cucina" ref={ref} style={{
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
          Cucina
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          marginTop: 12,
          letterSpacing: "0.04em",
        }}>
          Sicilian recipes from Emilia&apos;s kitchen
        </p>
      </div>

      {/* Recipes grid — populated when Emilia provides content */}
      {CUCINA.length === 0 ? (
        <p style={{
          textAlign: "center",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          fontStyle: "italic",
          opacity: vis ? 0.7 : 0,
          transition: "opacity 1s ease 0.3s",
        }}>
          Recipes coming soon
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 28,
        }}>
          {CUCINA.map((recipe, i) => (
            <article key={recipe.id} style={{
              background: th.surface,
              border: `1px solid ${th.border}`,
              borderRadius: 16,
              overflow: "hidden",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: 20 }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 500,
                  color: th.text,
                  margin: "0 0 8px",
                }}>
                  {recipe.title}
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: th.textSoft,
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {recipe.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

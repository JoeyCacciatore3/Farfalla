import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { useSEO } from "../seo/SEOOptimizer";
import { CUCINA, BLOG_INDEX_PATH } from "../../data/content";

/**
 * CucinaPreview — homepage teaser that links to the full /cucina page.
 * CucinaPage — the full route component at /cucina.
 */

export const CucinaPreview = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });

  return (
    <section id="cucina" ref={ref} style={{
      padding: "64px 28px 48px",
      maxWidth: 1100,
      margin: "0 auto",
      textAlign: "center",
    }}>
      <div style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
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
          marginBottom: 28,
          letterSpacing: "0.04em",
        }}>
          Sicilian recipes from Emilia&apos;s kitchen
        </p>
        <Link
          to="/cucina"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: th.accent,
            textDecoration: "none",
            padding: "12px 28px",
            borderRadius: 24,
            border: `1px solid ${th.accent}40`,
            transition: "all 0.3s ease",
          }}
        >
          Explore recipes
        </Link>
      </div>
    </section>
  );
};

export const CucinaPage = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [relatedPosts, setRelatedPosts] = useState([]);

  useSEO({
    title: "Cucina — Milly Farfalla",
    description: "Sicilian recipes from Emilia's kitchen. Traditional dishes, seasonal ingredients, and the Mediterranean way of eating.",
    path: "/cucina",
  });

  // Fetch blog posts tagged with "recipe" or "culture" to cross-link
  useEffect(() => {
    fetch(BLOG_INDEX_PATH)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const posts = Array.isArray(data) ? data : [];
        setRelatedPosts(posts.filter((p) =>
          p.tags && (p.tags.includes("recipe") || p.tags.includes("culture"))
        ).slice(0, 3));
      })
      .catch(() => setRelatedPosts([]));
  }, []);

  return (
    <main style={{
      padding: "120px 28px 80px",
      maxWidth: 1100,
      margin: "0 auto",
      minHeight: "80vh",
    }}>
      <div ref={ref} style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 300,
          color: th.text,
          margin: "0 0 12px",
          letterSpacing: "0.02em",
        }}>
          Cucina
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: th.textDim,
          margin: "0 0 48px",
          lineHeight: 1.6,
          maxWidth: 600,
        }}>
          Sicilian recipes from Emilia&apos;s kitchen — traditional dishes, seasonal ingredients, and the Mediterranean way of eating.
        </p>
      </div>

      {CUCINA.length === 0 ? (
        <div style={{
          opacity: vis ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}>
          {/* Visual "coming soon" card */}
          <div style={{
            background: th.bg2,
            border: `1.5px solid ${th.borderHover}`,
            borderRadius: 20,
            padding: "48px 36px",
            maxWidth: 600,
            margin: "0 auto 48px",
            textAlign: "center",
            boxShadow: th.cardShadow,
          }}>
            <div style={{
              fontSize: 48,
              marginBottom: 20,
              opacity: 0.6,
            }}>
              🍋
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              color: th.text,
              lineHeight: 1.6,
              margin: "0 0 12px",
            }}>
              Recipes are on their way from the kitchen.
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              color: th.textDim,
              lineHeight: 1.6,
            }}>
              Traditional Sicilian dishes — caponata, arancini, pasta alla Norma, and more. Each recipe passed down through generations in Palermo.
            </p>
          </div>

          {/* Related blog posts about food */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: th.textDim,
                fontWeight: 500,
                margin: "0 0 20px",
              }}>
                From the blog
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
              }}>
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      borderRadius: 16,
                      overflow: "hidden",
                      background: th.surface,
                      border: `1px solid ${th.border}`,
                      transition: "all 0.4s ease",
                    }}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: 160,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                    <div style={{ padding: "16px 20px" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 17,
                        fontWeight: 500,
                        color: th.text,
                        margin: "0 0 6px",
                        lineHeight: 1.3,
                      }}>
                        {post.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 12,
                        color: th.textDim,
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {post.excerpt.slice(0, 100)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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
    </main>
  );
};

// Keep backward compat export name
export const CucinaSection = CucinaPreview;

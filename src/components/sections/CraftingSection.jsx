import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { useSEO } from "../seo/SEOOptimizer";
import { CRAFTING, BLOG_INDEX_PATH } from "../../data/content";

/**
 * CraftingPreview — homepage teaser linking to /crafting.
 * CraftingPage — full route component at /crafting.
 */

export const CraftingPreview = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });

  return (
    <section id="crafting" ref={ref} style={{
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
          Crafting
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          marginTop: 12,
          marginBottom: 28,
          letterSpacing: "0.04em",
        }}>
          Handmade by Emilia — jewelry, d&eacute;cor, and wearables
        </p>
        <Link
          to="/crafting"
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
          Explore the workshop
        </Link>
      </div>
    </section>
  );
};

export const CraftingPage = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [relatedPosts, setRelatedPosts] = useState([]);

  useSEO({
    title: "Crafting — Milly Farfalla",
    description: "Handmade crafts by Emilia. Jewelry, décor, and wearables — each piece made with care in the Sicilian tradition.",
    path: "/crafting",
  });

  // Fetch blog posts tagged with "craft" or "art" to cross-link
  useEffect(() => {
    fetch(BLOG_INDEX_PATH)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const posts = Array.isArray(data) ? data : [];
        setRelatedPosts(posts.filter((p) =>
          p.tags && (p.tags.includes("craft") || p.tags.includes("art"))
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
          Crafting
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: th.textDim,
          margin: "0 0 48px",
          lineHeight: 1.6,
          maxWidth: 600,
        }}>
          Handmade crafts by Emilia — jewelry, d&eacute;cor, and wearables, each piece made with care in the Sicilian tradition.
        </p>
      </div>

      {CRAFTING.length === 0 ? (
        <div style={{
          opacity: vis ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}>
          {/* Visual "coming soon" card */}
          <div style={{
            background: th.surface,
            border: `1px solid ${th.border}`,
            borderRadius: 20,
            padding: "48px 36px",
            maxWidth: 600,
            margin: "0 auto 48px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 48,
              marginBottom: 20,
              opacity: 0.6,
            }}>
              ✂️
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              color: th.text,
              lineHeight: 1.6,
              margin: "0 0 12px",
            }}>
              The workshop is open. New pieces are on the table.
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              color: th.textDim,
              lineHeight: 1.6,
            }}>
              Handmade jewelry, painted décor, and wearable art — crafted by hand in Emilia&apos;s studio. Pieces and details coming soon.
            </p>
          </div>

          {/* Related blog posts */}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 28,
        }}>
          {CRAFTING.map((item, i) => (
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
                {item.category && (
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: th.accent,
                  }}>
                    {item.category}
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
    </main>
  );
};

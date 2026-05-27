import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { useSEO } from "../seo/SEOOptimizer";
import { BLOG_INDEX_PATH } from "../../data/content";

// Blog index — lists all posts with excerpts
const BlogIndex = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "Blog — Milly Farfalla",
    description: "Art, recipes, gardening, and Sicilian life — stories from Milly Farfalla's studio and kitchen.",
    path: "/blog",
  });

  useEffect(() => {
    fetch(BLOG_INDEX_PATH)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{
      position: "relative", zIndex: 2, padding: "120px 28px 80px",
      maxWidth: 900,
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
          Blog
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: th.textDim,
          margin: "0 0 48px",
          lineHeight: 1.6,
        }}>
          Art, recipes, gardening, and Sicilian life
        </p>
      </div>

      {loading ? (
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
        }}>
          Loading...
        </p>
      ) : posts.length === 0 ? (
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textDim,
          fontStyle: "italic",
        }}>
          Posts coming soon
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} th={th} index={i} />
          ))}
        </div>
      )}
    </main>
  );
};

// Individual blog card in the index — image + text side by side on desktop
const BlogCard = ({ post, th, index }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [hover, setHover] = useState(false);

  const dateStr = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      ref={ref}
      to={`/blog/${post.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: post.image ? "minmax(0, 280px) 1fr" : "1fr",
        gap: 0,
        textDecoration: "none",
        borderRadius: 16,
        overflow: "hidden",
        background: hover ? th.surfaceHover : th.surface,
        border: `1px solid ${hover ? th.borderHover : th.border}`,
        boxShadow: hover
          ? "0 12px 40px rgba(0,0,0,0.1)"
          : "0 4px 16px rgba(0,0,0,0.04)",
        opacity: vis ? 1 : 0,
        transform: vis
          ? (hover ? "translateY(-2px)" : "translateY(0)")
          : "translateY(20px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {post.image && (
        <div style={{
          overflow: "hidden",
          minHeight: 200,
        }}>
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hover ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      )}

      <div style={{ padding: "20px 24px" }}>
        <time style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: th.textDim,
          letterSpacing: "0.05em",
        }}>
          {dateStr}
        </time>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: th.accent,
                padding: "2px 8px",
                borderRadius: 6,
                background: `${th.accent}10`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
          fontWeight: 500,
          color: th.text,
          margin: "10px 0 8px",
          lineHeight: 1.3,
        }}>
          {post.title}
        </h2>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.textSoft,
          lineHeight: 1.6,
          margin: 0,
        }}>
          {post.excerpt}
        </p>

        <span style={{
          display: "inline-block",
          marginTop: 14,
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: th.accent,
          transition: "letter-spacing 0.3s ease",
          ...(hover ? { letterSpacing: "0.12em" } : {}),
        }}>
          Read more →
        </span>
      </div>
    </Link>
  );
};

/**
 * Individual blog post viewer — renders body text as styled paragraphs
 * with a hero image, proper typography, and reading-friendly layout.
 */
const BlogPost = ({ th }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, vis] = useInView({ t: 0.1 });

  useSEO({
    title: post ? `${post.title} — Milly Farfalla` : "Blog — Milly Farfalla",
    description: post?.excerpt || "",
    path: `/blog/${slug}`,
  });

  useEffect(() => {
    fetch(`/blog/posts/${slug}.json`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ position: "relative", zIndex: 2, padding: "120px 28px 80px", maxWidth: 720, margin: "0 auto", minHeight: "80vh" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: th.textDim }}>Loading...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main style={{ position: "relative", zIndex: 2, padding: "120px 28px 80px", maxWidth: 720, margin: "0 auto", minHeight: "80vh" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: th.text }}>Post not found</p>
        <Link to="/blog" style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: th.accent,
          textDecoration: "none",
          marginTop: 16,
          display: "inline-block",
        }}>
          ← Back to blog
        </Link>
      </main>
    );
  }

  const dateStr = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split body into paragraphs for proper styling (body uses \n\n as separator)
  const paragraphs = (post.body || "").split(/\n\n+/).filter(Boolean);

  return (
    <main style={{
      position: "relative", zIndex: 2, padding: "120px 28px 80px",
      maxWidth: 720,
      margin: "0 auto",
      minHeight: "80vh",
    }}>
      <div ref={ref} style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <Link to="/blog" style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          color: th.textDim,
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 32,
          transition: "color 0.3s ease",
        }}>
          ← Blog
        </Link>

        <time style={{
          display: "block",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          color: th.textDim,
          letterSpacing: "0.04em",
          marginBottom: 12,
        }}>
          {dateStr}
        </time>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400,
          color: th.text,
          margin: "0 0 8px",
          lineHeight: 1.2,
        }}>
          {post.title}
        </h1>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: th.accent,
                padding: "2px 8px",
                borderRadius: 6,
                background: `${th.accent}10`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hero image */}
        {post.image && (
          <div style={{
            marginBottom: 40,
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${th.border}`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.08)`,
          }}>
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                display: "block",
                maxHeight: 420,
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Styled body paragraphs */}
        <article>
          {paragraphs.map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 1.6vw, 1.15rem)",
              color: th.textSoft,
              lineHeight: 1.85,
              margin: i === 0 ? "0 0 24px" : "24px 0",
              ...(i === 0 ? {
                fontSize: "clamp(1.1rem, 1.8vw, 1.25rem)",
                color: th.text,
              } : {}),
            }}>
              {para}
            </p>
          ))}
        </article>

        {/* Signature */}
        <div style={{
          marginTop: 56,
          paddingTop: 28,
          borderTop: `1px solid ${th.border}`,
        }}>
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            color: th.accent,
            transform: "rotate(-2deg)",
            display: "inline-block",
          }}>
            — Milly
          </span>
        </div>

        {/* Back to blog */}
        <div style={{ marginTop: 40 }}>
          <Link to="/blog" style={{
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
          }}>
            ← All posts
          </Link>
        </div>
      </div>
    </main>
  );
};

export { BlogIndex, BlogPost };

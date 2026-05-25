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
      padding: "120px 28px 80px",
      maxWidth: 800,
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

// Individual blog card in the index
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
        display: "block",
        textDecoration: "none",
        padding: 24,
        borderRadius: 16,
        background: hover ? th.surfaceHover : th.surface,
        border: `1px solid ${hover ? th.borderHover : th.border}`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
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
    </Link>
  );
};

// Individual blog post viewer
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
      <main style={{ padding: "120px 28px 80px", maxWidth: 720, margin: "0 auto", minHeight: "80vh" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: th.textDim }}>Loading...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main style={{ padding: "120px 28px 80px", maxWidth: 720, margin: "0 auto", minHeight: "80vh" }}>
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

  return (
    <main style={{
      padding: "120px 28px 80px",
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

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: 16,
              marginBottom: 32,
              border: `1px solid ${th.border}`,
            }}
          />
        )}

        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 16,
          color: th.textSoft,
          lineHeight: 1.75,
          whiteSpace: "pre-wrap",
        }}>
          {post.body}
        </div>

        <div style={{
          marginTop: 48,
          paddingTop: 24,
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
      </div>
    </main>
  );
};

export { BlogIndex, BlogPost };

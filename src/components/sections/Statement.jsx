import { useInView } from "../../hooks/useInView";

export const Statement = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.2 });
  return (
    <section ref={ref} style={{ padding:"100px 28px 80px", maxWidth:880, margin:"0 auto", display:"flex", gap:36, alignItems:"flex-start", flexWrap:"wrap" }}>
      <div style={{ flex:"0 0 auto", width:50, paddingTop:10, opacity:vis?1:0, transition:"opacity 1s ease 0.2s" }}>
        <div style={{ width:36, height:1, background:`${th.accent}30` }}/>
      </div>
      <div style={{ flex:"1 1 280px" }}>
        {/* ✎ STATEMENT — Artist quote */}
        <blockquote style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.3rem,3.2vw,2.2rem)",
          color:th.text, fontWeight:300, lineHeight:1.55, margin:0, fontStyle:"italic",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}>
          &quot;I paint the space between what you see and what you feel — that uncertain, luminous threshold where memory dissolves into color.&quot;
        </blockquote>
        {/* ✎ STATEMENT — Bio paragraph */}
        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:14, color:th.textDim, lineHeight:1.9, marginTop:28, maxWidth:500,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)",
          transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          Working from a sun-flooded studio, Farfalla builds each piece through dozens of translucent layers — a slow, meditative process that can span weeks. The work lives at the intersection of abstraction and memory, inviting viewers to find their own stories within the color.
        </p>
        <span aria-hidden="true" style={{
          display:"inline-block", marginTop:24,
          fontFamily:"'Caveat',cursive", fontSize:"clamp(1.5rem,3vw,2rem)",
          color:th.accent, opacity:vis?0.9:0,
          transition:"opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s",
          transform:"rotate(-3deg)",
        }}>
          — Milly
        </span>
      </div>
    </section>
  );
};

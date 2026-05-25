/* eslint-disable react/no-unescaped-entities -- Italian text uses typographic apostrophes naturally */
import { useInView } from "../../hooks/useInView";

export const Statement = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.2 });
  return (
    <section ref={ref} style={{ padding:"72px 28px 56px", maxWidth:880, margin:"0 auto", display:"flex", gap:36, alignItems:"flex-start", flexWrap:"wrap" }}>
      <div style={{ flex:"0 0 auto", width:50, paddingTop:10, opacity:vis?1:0, transition:"opacity 1s ease 0.2s" }}>
        <div style={{ width:36, height:1, background:`${th.accent}30` }}/>
      </div>
      <div style={{ flex:"1 1 280px" }}>
        {/*
          ✎ STATEMENT — Emilia's own words. Provided by her via email
          2026-05-21. She wrote this in Italian, adapted from Version B we
          offered. Do NOT edit the Italian wording — it's her voice, her choice.
          English translation added per Joey's direction 2026-05-21.
        */}
        <p lang="it" style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,2vw,1.3rem)",
          color:th.textSoft, fontWeight:300, lineHeight:1.55, margin:0, fontStyle:"italic",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)",
          letterSpacing:"0.02em",
        }}>
          Mi chiamo Emilia e vengo da Palermo, in Sicilia — una terra che
          custodisce meraviglie artistiche dalla preistoria a oggi. Qui la
          bellezza è ovunque: graffiti dentro grotte millenarie, templi greci,
          architetture arabo-normanne, palazzi ottocenteschi. La Sicilia è anche
          natura — coste, vulcani, isole — ed è un'isola anch'essa; cibo che
          racconta una storia ad ogni morso: arancini, caponata, sarde a
          beccafico. Un'esperienza a 360 gradi che resta impressa nel cuore e
          nella mente. Da quel mondo nasce ogni mia opera.
        </p>
        <p lang="it" style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.95rem,1.8vw,1.15rem)",
          color:th.textSoft, fontWeight:300, lineHeight:1.55, margin:"16px 0 0", fontStyle:"italic",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
          letterSpacing:"0.02em",
        }}>
          I colori e l'odore della natura sono la mia più grande fonte d'ispirazione!
        </p>
        {/* ── English translation ── */}
        <p lang="en" style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.95rem,1.8vw,1.15rem)",
          color:th.textSoft, fontWeight:300, lineHeight:1.55, margin:"28px 0 0",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
          letterSpacing:"0.02em",
        }}>
          My name is Emilia and I come from Palermo, Sicily — a land that has
          guarded artistic wonders from prehistory to the present day. Here
          beauty is everywhere: cave graffiti thousands of years old, Greek
          temples, Arab-Norman architecture, nineteenth-century palaces. Sicily
          is also nature — coastlines, volcanoes, islands — and an island
          itself; food that tells a story with every bite: arancini, caponata,
          sarde a beccafico. A complete experience that stays imprinted on the
          heart and mind. From that world, every one of my works is born.
        </p>
        <p lang="en" style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.88rem,1.6vw,1.05rem)",
          color:th.textSoft, fontWeight:300, lineHeight:1.55, margin:"14px 0 0",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(25px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
          letterSpacing:"0.02em",
        }}>
          The colors and scents of nature are my greatest source of inspiration!
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

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
          offered. Do NOT edit the wording — it's her voice, her choice.
          English translation: open question, not yet answered.
        */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,2vw,1.3rem)",
          color:th.textDim, fontWeight:300, lineHeight:1.55, margin:0, fontStyle:"italic",
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
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.95rem,1.8vw,1.15rem)",
          color:th.textDim, fontWeight:300, lineHeight:1.55, margin:"16px 0 0", fontStyle:"italic",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
          letterSpacing:"0.02em",
        }}>
          I colori e l'odore della natura sono la mia più grande fonte d'ispirazione!
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

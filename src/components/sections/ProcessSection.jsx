import { useInView } from "../../hooks/useInView";
import { STEPS } from "../../data/content";

export const ProcessSection = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  return (
    <section id="process" style={{ padding:"80px 28px 100px", maxWidth:800, margin:"0 auto" }}>
      <div ref={ref} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:56 }}>
        <div style={{ width:vis?36:0, height:1, background:`${th.accent}35`, transition:"width 0.8s ease" }}/>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:th.textDim, opacity:vis?1:0, transition:"opacity 0.6s ease 0.2s" }}>
          The Process
        </span>
      </div>
      {STEPS.map((step, i) => {
        const [sRef, sVis] = useInView({ t: 0.15 });
        const flip = i % 2 !== 0;
        return (
          <div ref={sRef} key={i} style={{
            display:"flex", gap:"clamp(18px,3.5vw,44px)", marginBottom:72,
            alignItems:"flex-start", flexDirection:flip?"row-reverse":"row",
            flexWrap:"wrap", justifyContent:"center",
            opacity:sVis?1:0, transform:sVis?"translateY(0)":"translateY(45px)",
            transition:"all 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:8, paddingTop:6 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", border:`1.5px solid ${th.accent}40`, background:sVis?`${th.accent}25`:"transparent", transition:"background 0.5s ease 0.3s" }}/>
              <div style={{ width:1, height:50, background:`linear-gradient(${th.accent}18, transparent)` }}/>
            </div>
            <div style={{ flex:"1 1 200px", maxWidth:280 }}>
              <div style={{
                borderRadius:10, overflow:"hidden",
                clipPath:sVis?"inset(0)":"inset(0 0 100% 0)",
                transition:`clip-path 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s`,
              }}>
                <img src={step.img} alt={step.title} loading="lazy"
                  style={{ width:"100%", display:"block", aspectRatio:"8/5", objectFit:"cover", filter:th.imgFilter }}/>
              </div>
            </div>
            <div style={{ flex:"1 1 200px" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:50, fontWeight:200, color:`${th.accent}0d`, lineHeight:1, display:"block" }}>
                {String(i+1).padStart(2,"0")}
              </span>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:500, color:th.text, margin:"2px 0 10px" }}>{step.title}</h3>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:th.textDim, lineHeight:1.85 }}>{step.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

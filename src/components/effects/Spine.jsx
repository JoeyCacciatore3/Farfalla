export const Spine = ({ scrollP, th }) => (
  <div className="fn-spine" style={{
    position:"fixed", left:"50%", top:0, bottom:0, width:1, zIndex:3,
    pointerEvents:"none", transform:"translateX(-0.5px)",
  }}>
    <div style={{ width:1, background:`linear-gradient(180deg, transparent 0%, ${th.accent}20 10%, ${th.accent}0d 50%, ${th.accent}20 90%, transparent 100%)`, height:"100%", position:"relative" }}>
      <div style={{
        position:"absolute", left:-3, width:7, height:7, borderRadius:"50%",
        background:th.accent, boxShadow:`0 0 14px ${th.accent}50`,
        top:`${scrollP * 100}%`, transition:"top 0.12s linear",
      }}/>
    </div>
  </div>
);

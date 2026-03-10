export const ProgressBar = ({ scrollP, th }) => (
  <div style={{ position:"fixed", top:0, left:0, height:2, zIndex:10002,
    width:`${scrollP * 100}%`, background:`linear-gradient(90deg, ${th.accent}, ${th.accent2})`,
    transition:"width 0.08s linear",
  }}/>
);

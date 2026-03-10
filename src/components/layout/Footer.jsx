export const Footer = ({ th }) => (
  <footer style={{ padding:"28px 28px", textAlign:"center", borderTop:`1px solid ${th.border}` }}>
    {/* ✎ FOOTER — Your city */}
    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textGhost, letterSpacing:"0.1em" }}>
      © {new Date().getFullYear()} Farfalla · Made with love
    </p>
  </footer>
);

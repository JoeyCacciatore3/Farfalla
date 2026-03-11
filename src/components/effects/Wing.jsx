export const Wing = ({ size=36, style={}, className="" }) => (
  <svg width={size} height={size} viewBox="0 0 140 120" style={style} className={className} fill="none" aria-hidden="true">
    <g transform="translate(70,56)">
      {/* ── Left upper wing ── */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 -4 -2;-12 -4 -2;0 -4 -2" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/>
        {/* Wing fill — orange */}
        <path d="M-3,-4 C-10,-18 -18,-36 -30,-44 C-40,-50 -52,-46 -56,-36 C-60,-26 -56,-14 -48,-6 C-40,2 -26,10 -16,10 C-8,10 -3,4 -3,-4Z" fill="#E8751A"/>
        {/* Black border */}
        <path d="M-3,-4 C-10,-18 -18,-36 -30,-44 C-40,-50 -52,-46 -56,-36 C-60,-26 -56,-14 -48,-6 C-40,2 -26,10 -16,10 C-8,10 -3,4 -3,-4Z" stroke="#1a1008" strokeWidth="2.5" fill="none"/>
        {/* Wing veins */}
        <path d="M-3,-2 C-14,-8 -32,-20 -48,-10" stroke="#1a1008" strokeWidth="1.2" fill="none" opacity=".6"/>
        <path d="M-3,-4 C-12,-16 -24,-32 -38,-40" stroke="#1a1008" strokeWidth="1" fill="none" opacity=".5"/>
        <path d="M-6,2 C-18,0 -34,2 -46,-2" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity=".4"/>
        {/* Edge spots — white */}
        <circle cx="-54" cy="-30" r="1.8" fill="#fff" opacity=".85"/>
        <circle cx="-56" cy="-22" r="1.5" fill="#fff" opacity=".75"/>
        <circle cx="-52" cy="-14" r="1.5" fill="#fff" opacity=".7"/>
        <circle cx="-46" cy="-4" r="1.3" fill="#fff" opacity=".65"/>
        <circle cx="-38" cy="-46" r="1.2" fill="#fff" opacity=".6"/>
      </g>

      {/* ── Right upper wing ── */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 4 -2;12 4 -2;0 4 -2" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/>
        <path d="M3,-4 C10,-18 18,-36 30,-44 C40,-50 52,-46 56,-36 C60,-26 56,-14 48,-6 C40,2 26,10 16,10 C8,10 3,4 3,-4Z" fill="#E8751A"/>
        <path d="M3,-4 C10,-18 18,-36 30,-44 C40,-50 52,-46 56,-36 C60,-26 56,-14 48,-6 C40,2 26,10 16,10 C8,10 3,4 3,-4Z" stroke="#1a1008" strokeWidth="2.5" fill="none"/>
        <path d="M3,-2 C14,-8 32,-20 48,-10" stroke="#1a1008" strokeWidth="1.2" fill="none" opacity=".6"/>
        <path d="M3,-4 C12,-16 24,-32 38,-40" stroke="#1a1008" strokeWidth="1" fill="none" opacity=".5"/>
        <path d="M6,2 C18,0 34,2 46,-2" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity=".4"/>
        <circle cx="54" cy="-30" r="1.8" fill="#fff" opacity=".85"/>
        <circle cx="56" cy="-22" r="1.5" fill="#fff" opacity=".75"/>
        <circle cx="52" cy="-14" r="1.5" fill="#fff" opacity=".7"/>
        <circle cx="46" cy="-4" r="1.3" fill="#fff" opacity=".65"/>
        <circle cx="38" cy="-46" r="1.2" fill="#fff" opacity=".6"/>
      </g>

      {/* ── Left lower wing ── */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 -6 6;-7 -6 6;0 -6 6" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/>
        <path d="M-3,4 C-10,10 -24,26 -34,32 C-42,36 -44,30 -40,22 C-36,14 -22,8 -12,6 C-6,5 -3,4 -3,4Z" fill="#D46A15"/>
        <path d="M-3,4 C-10,10 -24,26 -34,32 C-42,36 -44,30 -40,22 C-36,14 -22,8 -12,6Z" stroke="#1a1008" strokeWidth="2" fill="none"/>
        <path d="M-5,5 C-16,12 -28,22 -36,26" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity=".45"/>
        <circle cx="-38" cy="28" r="1.2" fill="#fff" opacity=".65"/>
        <circle cx="-42" cy="24" r="1" fill="#fff" opacity=".55"/>
      </g>

      {/* ── Right lower wing ── */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 6 6;7 6 6;0 6 6" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/>
        <path d="M3,4 C10,10 24,26 34,32 C42,36 44,30 40,22 C36,14 22,8 12,6 C6,5 3,4 3,4Z" fill="#D46A15"/>
        <path d="M3,4 C10,10 24,26 34,32 C42,36 44,30 40,22 C36,14 22,8 12,6Z" stroke="#1a1008" strokeWidth="2" fill="none"/>
        <path d="M5,5 C16,12 28,22 36,26" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity=".45"/>
        <circle cx="38" cy="28" r="1.2" fill="#fff" opacity=".65"/>
        <circle cx="42" cy="24" r="1" fill="#fff" opacity=".55"/>
      </g>

      {/* ── Body ── */}
      <ellipse cx="0" cy="2" rx="2.8" ry="16" fill="#1a1008"/>
      <ellipse cx="0" cy="-14" rx="3.2" ry="4" fill="#1a1008"/>
      {/* Eyes */}
      <circle cx="-2" cy="-16" r="0.8" fill="#fff" opacity=".5"/>
      <circle cx="2" cy="-16" r="0.8" fill="#fff" opacity=".5"/>
      {/* Antennae */}
      <path d="M-2,-17 Q-8,-30 -12,-36" stroke="#1a1008" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M2,-17 Q8,-30 12,-36" stroke="#1a1008" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="-12" cy="-36" r="1.5" fill="#1a1008"/>
      <circle cx="12" cy="-36" r="1.5" fill="#1a1008"/>
    </g>
  </svg>
);

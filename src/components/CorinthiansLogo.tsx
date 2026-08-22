import React from 'react';

interface CorinthiansLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CorinthiansLogo: React.FC<CorinthiansLogoProps> = ({
  size = 48,
  showText = false,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        ...style,
      }}
      title="Sport Club Corinthians Paulista - Vai Corinthians! 🦅"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))', flexShrink: 0 }}
      >
        {/* Estrelas Douradas no topo (Mundiais de Clubes 2000 & 2012) */}
        <g id="estrelas">
          {/* Estrela 1 */}
          <polygon
            points="80,18 84,28 95,29 87,37 89,48 80,42 71,48 73,37 65,29 76,28"
            fill="#F59E0B"
            stroke="#FEF08A"
            strokeWidth="1.5"
          />
          {/* Estrela 2 */}
          <polygon
            points="120,18 124,28 135,29 127,37 129,48 120,42 111,48 113,37 105,29 116,28"
            fill="#F59E0B"
            stroke="#FEF08A"
            strokeWidth="1.5"
          />
        </g>

        {/* Âncora e Remos em Vermelho/Preto (Elementos Náuticos do Timão) */}
        <g id="remos-ancora">
          {/* Remos Cruzados */}
          <line x1="35" y1="60" x2="165" y2="190" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
          <path d="M 30,55 L 42,45 L 50,55 L 38,65 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          
          <line x1="165" y1="60" x2="35" y2="190" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
          <path d="M 170,55 L 158,45 L 150,55 L 162,65 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />

          {/* Âncora Central */}
          <path d="M 100,50 L 100,195" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
          <circle cx="100" cy="52" r="10" stroke="#DC2626" strokeWidth="5" fill="none" />
          <path d="M 60,165 C 75,205 125,205 140,165" stroke="#DC2626" strokeWidth="9" fill="none" strokeLinecap="round" />
          <polygon points="56,160 68,168 56,176" fill="#DC2626" />
          <polygon points="144,160 132,168 144,176" fill="#DC2626" />
        </g>

        {/* Círculo Principal do Escudo */}
        <circle cx="100" cy="120" r="68" fill="#09090B" stroke="#FFFFFF" strokeWidth="6" />

        {/* Anel Interno com Borda */}
        <circle cx="100" cy="120" r="54" fill="#09090B" stroke="#DC2626" strokeWidth="3" />

        {/* Escudo Interno (Padrão Alvinegro com Listras) */}
        <g id="escudo-interno">
          <clipPath id="shieldClip">
            <path d="M 70,88 C 70,88 100,80 130,88 C 130,120 130,140 100,158 C 70,140 70,120 70,88 Z" />
          </clipPath>
          
          {/* Fundo do Escudo */}
          <path d="M 70,88 C 70,88 100,80 130,88 C 130,120 130,140 100,158 C 70,140 70,120 70,88 Z" fill="#000000" stroke="#FFFFFF" strokeWidth="4" />
          
          {/* Listras Verticais Brancas e Pretas */}
          <g clipPath="url(#shieldClip)">
            <rect x="70" y="80" width="10" height="80" fill="#FFFFFF" />
            <rect x="80" y="80" width="10" height="80" fill="#000000" />
            <rect x="90" y="80" width="10" height="80" fill="#FFFFFF" />
            <rect x="100" y="80" width="10" height="80" fill="#000000" />
            <rect x="110" y="80" width="10" height="80" fill="#FFFFFF" />
            <rect x="120" y="80" width="10" height="80" fill="#000000" />

            {/* Bandeira Paulista/Vermelha no Canto do Escudo */}
            <rect x="70" y="80" width="30" height="20" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="78" cy="88" r="3" fill="#FFFFFF" />
          </g>
        </g>

        {/* Texto Curvo do Timão (S.C. CORINTHIANS PAULISTA 1910) */}
        <path id="textPath" d="M 42,120 A 58,58 0 1,1 158,120" fill="none" />
        <text fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1.2">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            CORINTHIANS
          </textPath>
        </text>

        {/* Ano de Fundação 1910 */}
        <text x="100" y="180" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">
          1910
        </text>
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em' }}>
            S.C. CORINTHIANS
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#ef4444' }}>
            VAI CORINTHIANS! 🦅
          </span>
        </div>
      )}
    </div>
  );
};

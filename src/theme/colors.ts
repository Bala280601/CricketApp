export const Colors = {
  // 🌌 Premium Dark Theme (Obsidian & Deep Space)
  background: '#040508',     // Deepest Midnight
  surface: '#0C0E14',        // Space Grey
  surfaceVariant: '#151921', // Dark Slate
  card: '#0F121A',           // Dark Obsidian Card
  
  // ✨ Unique Glowing Accents
  primary: '#EAB308',        // Golden Sun
  primaryLight: '#FDE68A',
  primaryDark: '#CA8A04',
  
  secondary: '#22D3EE',      // Electric Cyan
  secondaryLight: '#99F6E4',
  secondaryDark: '#0891B2',
  
  accent: '#A855F7',         // Royal Purple Glow
  accentLight: '#D8B4FE',
  accentDark: '#7C3AED',
  
  // 🚦 Semantic Colors (Vibrant & Neon)
  success: '#10B981',        // Neon Emerald
  successDark: '#064E3B',
  
  danger: '#FF2E63',         // Electric Crimson
  dangerDark: '#880D1E',
  
  warning: '#F97316',        // Lava Orange
  warningDark: '#9A3412',
  
  info: '#3B82F6',           // Bright Azure
  
  // 📝 Typography (High Contrast & Tinted)
  textPrimary: '#F8FAFC',    // Paper White
  textSecondary: '#94A3B8',  // Cool Slate
  textMuted: '#64748B',      // Dim Grey
  textGold: '#FDE047',       // Gold Tinted
  textInverse: '#040508',
  
  // 🏆 Performance Tiers (Metallic Gloss)
  gold: '#FBC02D',
  goldLight: '#FFF59D',
  silver: '#B0BEC5',
  silverLight: '#ECEFF1',
  bronze: '#8D6E63',
  bronzeLight: '#D7CCC8',

  // 🛡️ Borders & Outlines
  border: '#1E293B',
  borderLight: '#334155',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  
  // 🌈 Premium Multi-Tone Gradients
  gradientGold: ['#EAB308', '#92400E', '#451A03'],
  gradientSilver: ['#94A3B8', '#475569', '#1E293B'],
  gradientBronze: ['#8D6E63', '#5D4037', '#2D1A16'],
  
  gradientCyber: ['#22D3EE', '#8B5CF6'], // Cyan to Purple
  gradientFire: ['#F97316', '#EF4444'],  // Orange to Red
  gradientEmerald: ['#34D399', '#059669'],
  gradientDark: ['#151921', '#040508'],
  
  // 🌫️ Transparency & Overlays
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.85)',
  glass: 'rgba(15, 18, 26, 0.7)',
  glassLight: 'rgba(255, 255, 255, 0.03)',
};

export const TierColors = {
  GOLD: { 
    bg: '#1A1608', 
    border: '#EAB308', 
    text: '#FEF08A', 
    glow: '#EAB308',
    gradient: ['#EAB308', '#B45309'] as string[] 
  },
  SILVER: { 
    bg: '#0F172A', 
    border: '#94A3B8', 
    text: '#F1F5F9', 
    glow: '#94A3B8',
    gradient: ['#94A3B8', '#475569'] as string[] 
  },
  BRONZE: { 
    bg: '#1C1917', 
    border: '#78350F', 
    text: '#FDE68A', 
    glow: '#8D6E63',
    gradient: ['#8D6E63', '#4E342E'] as string[] 
  },
};

export default Colors;

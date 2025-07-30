/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',      // Small Mobile
      'sm': '375px',      // Standard Mobile
      'mobile': '415px',  // Large Mobile
      'tablet': '481px',  // Portrait Tablet
      'md': '768px',      // Standard breakpoint
      'lg': '1024px',     // Landscape Tablet
      'xl': '1280px',     // Desktop
      '2xl': '1536px',    // Large Desktop
    },
    extend: {
      colors: {
        'obsidian': '#0A0B0F',
        'ice-blue': '#3B82F6',
        'charcoal': '#1F2937',
        'titanium': '#E5E7EB',
        'steel-blue': '#64748B',
        'slate': '#475569',
        'pearl': '#F9FAFB',
        'graphite': '#111827',
        'signal-green': '#10B981',
        'alert-red': '#EF4444',
        'gold': '#F59E0B',
      },
      fontFamily: {
        'cassio': ['Cassio BC', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.3' }],
        'display-lg': ['64px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'small': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'large': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
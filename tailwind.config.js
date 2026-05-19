/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mj: {
          // Off-white / light grey scale
          bg:    '#F3F1EC',
          bg2:   '#EBEBEA',
          bg3:   '#F9F8F6',
          card:  '#E8E6E1',
          card2: '#DDDBD6',
          b1:    '#D5D3CE',
          b2:    '#C2C0BB',
          // Text
          t1:    '#1A1A18',
          t2:    '#383836',
          t3:    '#5A5A58',
          t4:    '#8A8A87',
          t5:    '#AEAEAD',
          // Dark sections
          dk1:   '#181A1C',
          dk2:   '#202428',
          dk3:   '#2C3035',
          dkt1:  '#D8D8D4',
          dkt2:  '#7A8088',
          // White
          white: '#FAFAF8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['clamp(2rem,4vw,3.5rem)',    { lineHeight: '1.05' }],
        'display-md': ['clamp(3rem,6vw,5rem)',       { lineHeight: '1.0'  }],
        'display-lg': ['clamp(4rem,8vw,7.5rem)',     { lineHeight: '0.93' }],
        'vision-num': ['clamp(4.5rem,9vw,7.5rem)',   { lineHeight: '0.9'  }],
      },
      transitionTimingFunction: {
        'lux': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'lux-in': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'marquee':  'marquee 30s linear infinite',
        'float':    'float 6s ease-in-out infinite',
        'shimmer':  'shimmer 1.5s ease-in-out infinite',
        'slide-in': 'slideIn .55s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        slideIn:  { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}

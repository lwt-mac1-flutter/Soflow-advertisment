export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        /** Large kiosk / small floor display */
        signage: '1920px',
        /** 32" class devices at QHD+ logical width (scaled 4K, etc.) */
        floor: '2560px',
        /** Native / full-width 4K UHD (3840×2160) — ApoloSign-style panels */
        display4k: '3840px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
}
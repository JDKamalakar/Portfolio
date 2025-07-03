/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        // Custom animations for PWA Installer
        'bounce-slow': 'bounce-slow 2s infinite', // Slower bounce for the device icon
        'ripple': 'ripple 2s ease-out infinite',    // Faint light ripple effect
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        ripple: {
          '0%': {
            transform: 'translate(-50%, 0) scale(0)',
            opacity: '0',
          },
          '50%': {
            transform: 'translate(-50%, -10px) scale(1)', // Moves slightly up and scales out
            opacity: '0.4', // Peaks in opacity
          },
          '100%': {
            transform: 'translate(-50%, -20px) scale(1.5)', // Continues to move up and scale
            opacity: '0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};
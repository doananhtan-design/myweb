/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // hiệu ứng gradient di chuyển
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        // hiệu ứng nổi
        float: 'float 6s ease-in-out infinite',
        // bounce banner khi xuất hiện
        'bounce-slow': 'bounce-slow 0.5s ease-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(-50%) translateX(0)',
          },
          '50%': {
            transform: 'translateY(-48%) translateX(6px)',
          },
        },
        // keyframes bounce nhẹ cho banner
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

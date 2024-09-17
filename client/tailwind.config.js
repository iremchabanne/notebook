/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImages: {
        "login-register-bg": "url(./src/assets/images/bg-1.png)",
        "profile-bg": "url(./src/assets/images/bg-profile.png)",
      },
      fontFamily: {
        gloria: ["Gloria Hallelujah", "cursive"],
      },
      colors: {
        redd: "#E94B4C",
        greenn: "#32A998",
        blackk: "#373232",
      },
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bpg: ['"BPG Glaho Sylfaen"', 'serif'],
        unicode: ['"3D Unicode"', 'serif'],
        mtavruli: ['"BPG Nino Mtavruli"', 'serif'],
      },
      colors: {
        mainCol: "#4169E1",
        btnLight:"#3454b4",
        btnDark:"#033AA8",
        light1:"#ecf0fc",
        light2:"#d9e1f9",
        light3:"#c6d2f6",
        dark1:"#0d152d",
        dark2:"#142044",
        darkshadow:"#142044",
        shadow1:"#213571",
        contrastColl:"#F4511E"
      }
    },
     
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("tailwind-scrollbar"),
  ],
}

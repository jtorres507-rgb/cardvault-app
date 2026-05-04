/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vaultBlack: "#000000",
        graphite950: "#09090B",
        graphite900: "#111315",
        graphite800: "#17191C",
        steelBorder: "#2B3138",
        vaultGold: "#F5C451",
        dataCyan: "#38BDF8",
        profitGreen: "#34D399",
        riskRed: "#F87171",
        watchAmber: "#F59E0B",
      },
      boxShadow: {
        vault: "0 0 40px rgba(245, 196, 81, 0.08)",
        panel: "0 18px 60px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
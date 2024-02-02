import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".toast-container": {
          maxWidth: "100%",
          height: "100vh",
          overflow: "hidden",
          pointerEvents: "none",
          padding: "16px",
          position: "fixed",
          zIndex: "9999",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        },
      });
    }),
  ],
};

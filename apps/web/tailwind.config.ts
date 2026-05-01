import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        accent: "var(--color-accent)"
      },
      boxShadow: {
        float: "0 30px 80px rgba(15, 23, 42, 0.15)"
      },
      backgroundImage: {
        "heatmap-grid":
          "radial-gradient(circle at center, rgba(255,255,255,0.14) 0, rgba(255,255,255,0) 52%), linear-gradient(135deg, rgba(255,255,255,0.08) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 75%, transparent 75%, transparent)"
      }
    }
  },
  plugins: []
};

export default config;

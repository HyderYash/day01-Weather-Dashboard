import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                text: "var(--color-text)",
                accent: "var(--color-accent)",
                surface: "var(--color-surface)",
                border: "var(--color-border)",
                "apple-silver": "#D1D1D1",
                "apple-space-gray": "#4A4A4A",
                "apple-midnight": "#191B28",
                "apple-starlight": "#E5E2DC",
                "apple-blue": "#007AFF",
                "apple-green": "#34C759",
                "apple-red": "#FF3B30",
                "apple-yellow": "#FFCC00",
                "apple-purple": "#AF52DE",
            },
            borderRadius: {
                card: "var(--radius)",
            },
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', 'Helvetica Neue', 'sans-serif'],
            },
            transitionProperty: {
                default: "var(--transition)",
            },
        },
    },
    plugins: [],
};
export default config;

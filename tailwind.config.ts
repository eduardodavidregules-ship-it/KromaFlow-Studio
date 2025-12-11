import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                lumibg: '#0A1C41',
                lumipurple: { DEFAULT: '#A855F7', glow: 'rgba(168, 85, 247, 0.5)' },
                lumicyan: { DEFAULT: '#22D3EE', glow: 'rgba(34, 211, 238, 0.5)' },
            },
            backgroundImage: {
                'premium-gradient': 'radial-gradient(circle at top left, #132550 0%, #0A1C41 100%)',
            },
            boxShadow: {
                'neon-purple': '0 0 15px rgba(168, 85, 247, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
        },
    },
    plugins: [],
};
export default config;

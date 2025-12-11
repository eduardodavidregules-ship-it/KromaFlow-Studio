import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "KromaFlow | AI Video Creation",
    description: "Create monetizable long-form YouTube videos with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0, backgroundColor: '#0A1C41', color: 'white' }} className={`${inter.variable} ${outfit.variable}`}>
                {children}
            </body>
        </html>
    );
}

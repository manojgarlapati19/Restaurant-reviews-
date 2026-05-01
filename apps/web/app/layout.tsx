import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { appConfig } from "@dishcovery/config";
import { Providers } from "../components/providers";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"]
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: `${appConfig.name} | ${appConfig.tagline}`,
  description: "Dish-first discovery for diners who care about taste, value, trust, and context."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-[var(--font-sans)] text-stone-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

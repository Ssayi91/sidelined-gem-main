import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";


const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Sidelined Gem",
  description: "A cinematic editorial archive for Deaf culture, CODA identity, and linguistic human rights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
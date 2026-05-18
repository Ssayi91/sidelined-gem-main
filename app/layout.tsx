import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side path detection
  const headersList = await headers();
  const url = headersList.get("next-url") || "/";
  let pathname = "/";
  
  try {
    pathname = new URL(url, "http://localhost").pathname;
  } catch (e) {
    // Fallback if URL parsing fails
    pathname = url.split("?")[0].split("#")[0];
  }

  const isContact = pathname === "/contact";

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Conditionally render Footer based on server path */}
        {!isContact && <Footer />}
      </body>
    </html>
  );
}
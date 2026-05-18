// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The Sidelined Gem",
  description: "Connect, collaborate, and support the work. Warm, non-corporate contact hub.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navbar is already in root layout, so we don't repeat it here */}
      <main className="flex-grow">{children}</main>
      {/* Footer intentionally omitted for this route */}
    </>
  );
}
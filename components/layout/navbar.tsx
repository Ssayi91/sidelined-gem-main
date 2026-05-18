"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Research", href: "/research" },
  { label: "Themes", href: "/themes" },
  { label: "Resources", href: "/resources" },
  { label: "Podcast", href: "/podcast" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Kept on top layer */}
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-charcoal hover:text-lime transition-colors z-50 relative"
            onClick={closeMenu}
          >
            The Sidelined Gem
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? "text-lime border-b-2 border-lime pb-1"
                    : "text-charcoal hover:text-lime"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-50 relative"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 mt-1.5 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 mt-1.5 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Positioned BELOW the navbar (top-20) */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-40 bg-cream border-t-2 border-charcoal overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"
        }`}
        style={{ top: "5rem" }} // 5rem = 80px height of navbar
      >
        <div className="flex flex-col px-6 py-8 gap-6 max-h-[calc(100vh-5rem)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`font-serif text-3xl leading-tight transition-colors ${
                pathname === link.href ? "text-lime" : "text-charcoal hover:text-lime"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client";

// 1. Import React tools
import { useState } from "react";

// 2. Import Next.js components
import Link from "next/link";
import Image from "next/image";

// 3. Import icons
import { Menu, X, ArrowRight } from "lucide-react";

// 4. Import logo
import logo from "@/app/assets/logo.png";

// 5. Navigation links
const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

// 6. Logo component
function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logo}
        alt="Hireloop Logo"
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  );
}

// 7. Main Navbar component
export function Navbar() {

  // Mobile menu open and close
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090f]/95 backdrop-blur-md">

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500"
          >
            Get Started

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#09090f] px-5 py-5 md:hidden"
        >

          <div className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/signin"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-violet-500 hover:to-indigo-500"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>

          </div>
        </div>
      )}

    </header>
  );
}

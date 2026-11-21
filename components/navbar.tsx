
"use client";

// 1. React
import { useState } from "react";

// 2. Next.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 3. Icons
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

// 4. Logo
import logo from "@/app/assets/logo.png";

// 5. Better Auth client
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();

  // Session (Better Auth)
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  // `role` is a custom field. Until you add it to Better Auth's types
  // (inferAdditionalFields plugin), read it through a safe cast.
  const role =
    (session?.user as { role?: string } | undefined)?.role ?? "seeker";

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Navigation links (must live inside the component to use `session`)
  const navLinks = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    
  { label: "Dashboard", href: `/dashboard/${role}` }
      
  ];

  // Logout
  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      closeMenu();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
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

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-5 md:flex">
          {isPending ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : isLoggedIn ? (
            <>
              <span className="text-sm font-medium text-white">
                Hi, {session.user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white disabled:opacity-50"
              >
                <LogOut className="size-4" />
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
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

            {isPending ? null : isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 disabled:opacity-50"
              >
                <LogOut className="size-4" />
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const mainLinks = [
  { label: "ARTICLES", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/#about" },
];

const serviceLinks = [
  { label: "ARTICLES", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "TEAM", href: "/services#team" },
  { label: "CONTACT", href: "/services#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isServicesSection =
    pathname.startsWith("/services") || pathname === "/services";

  const navLinks = isServicesSection ? serviceLinks : mainLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm tracking-wider text-white hover:text-[#a3e635] transition-colors"
          >
            &lt;EZRA.ODYN /&gt;
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href === "/" && pathname === "/") ||
                (link.href === "/services" &&
                  pathname.startsWith("/services"));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-mono text-xs tracking-widest transition-colors relative group ${
                    isActive
                      ? "text-white"
                      : "text-[#737373] hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-[#a3e635] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://github.com/Ezra5566"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://instagram.com/typical_ezy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </a>
            <Link
              href="/services#contact"
              className="font-mono text-xs tracking-widest text-[#a3e635] hover:text-[#bef264] transition-colors flex items-center gap-1"
            >
              <span className="text-[#737373]">(</span>
              <span>)</span>
              <span className="ml-1">=&gt;</span>
              <span className="ml-1">
                {isServicesSection ? "CONTACT" : "GET A QUOTE"}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-[#0a0a0a] border-b border-[#262626] transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-lg tracking-widest text-white hover:text-[#a3e635] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/services#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-mono text-sm tracking-widest text-[#a3e635] hover:text-[#bef264] transition-colors mt-4 pt-4 border-t border-[#262626]"
          >
            GET A QUOTE
          </Link>
          <div className="flex gap-4 pt-4 border-t border-[#262626]">
            <a
              href="https://github.com/Ezra5566"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://instagram.com/typical_ezy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

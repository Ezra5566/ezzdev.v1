"use client";

import { Github, Twitter, Rss, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: ".PUBLICATION",
    links: [
      { label: "Articles", href: "/" },
      { label: "Categories", href: "/#articles" },
      { label: "About", href: "/#about" },
    ],
  },
  {
    title: ".SERVICES",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Marketing", href: "/services/digital-marketing" },
      { label: "Graphics & Design", href: "/services/logo-branding" },
      { label: "Video & Media", href: "/services/video-editing" },
      { label: "AI & Software", href: "/services/ai-integration" },
    ],
  },
  {
    title: ".COMPANY",
    links: [
      { label: "Services", href: "/services" },
      { label: "Team", href: "/services#team" },
      { label: "Get a Quote", href: "/services#quote" },
      { label: "Contact", href: "/services#contact" },
    ],
  },
  {
    title: ".CONNECT",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Twitter", href: "https://twitter.com", external: true },
      { label: "RSS Feed", href: "#" },
    ],
  },
];

const legalLinks = ["TERMS.MD", "PRIVACY.MD"];

export default function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-[#262626]">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
                {section.title}
              </span>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#737373] hover:text-[#a3e635] transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-mono text-xs text-[#737373] hover:text-[#a3e635] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#262626] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono text-[10px] text-[#737373] hover:text-white transition-colors tracking-widest"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-start md:justify-end gap-6">
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest flex items-center gap-1"
                >
                  <Github size={12} />
                  GITHUB
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest flex items-center gap-1"
                >
                  <Twitter size={12} />
                  TWITTER
                </a>
                <a
                  href="#"
                  className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest flex items-center gap-1"
                >
                  <Rss size={12} />
                  RSS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 gap-0.5">
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-transparent" />
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-transparent" />
              <div className="w-2 h-2 bg-[#a3e635]" />
              <div className="w-2 h-2 bg-[#a3e635]" />
            </div>
            <span className="font-mono text-[10px] text-[#737373] tracking-widest">
              {'// © 2025 <EZRA.ODYN /> ALL RIGHTS RESERVED'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/254705156757?text=Hello%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[#25D366] hover:text-[#20bd5a] transition-colors tracking-widest flex items-center gap-1"
            >
              <MessageCircle size={12} />
              WHATSAPP
            </a>
            <span className="font-mono text-[10px] text-[#737373] tracking-widest">
              {'// BUILT_FOR_BUILDERS'}
            </span>
          </div>
        </div>

        {/* Pixel Decorations */}
        <div className="relative mt-8 h-8 overflow-hidden">
          <div className="absolute bottom-0 left-0 flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#a3e635]"
                style={{ opacity: i % 2 === 0 ? 0.6 : 0.3 }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-1/3 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#a3e635]"
                style={{ opacity: i % 2 === 0 ? 0.6 : 0.3 }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#a3e635]"
                style={{ opacity: i % 2 === 0 ? 0.6 : 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

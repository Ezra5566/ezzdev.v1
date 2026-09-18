"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation";
import PixelParticles from "./components/PixelParticles";
import Hero from "./components/Hero";
import About from "./components/About";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background Pixel Particles */}
      <PixelParticles />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <Articles />
        <About />
        <Footer />
      </div>

      {/* Global Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </main>
  );
}

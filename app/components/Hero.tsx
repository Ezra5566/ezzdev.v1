"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current, metaRef.current], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          metaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] flex flex-col justify-center pt-24 pb-16 px-6 lg:px-12"
    >
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Section Label */}
        <div className="mb-8">
          <span className="font-mono text-xs text-[#737373] tracking-widest">
            {'// WRITING ON SOFTWARE, AI & SYSTEMS'}
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8"
        >
          <span className="text-white">THOUGHTS ON</span>
          <br />
          <span className="text-[#a3e635]">BUILDING</span>
          <span className="text-white"> THINGS</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-sm md:text-base text-[#737373] leading-relaxed mb-12 font-light"
        >
          DEEP DIVES INTO AI ENGINEERING, SOFTWARE ARCHITECTURE, CYBERSECURITY,
          AND THE PRACTICAL LESSONS FROM BUILDING SYSTEMS THAT ACTUALLY WORK.
        </p>

        {/* Meta */}
        <div ref={metaRef} className="flex flex-wrap items-center gap-6 pt-8 border-t border-[#262626]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
            <span className="font-mono text-[10px] text-[#737373] tracking-widest">
              WRITING REGULARLY
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#737373]">|</span>
          <span className="font-mono text-[10px] text-[#737373] tracking-widest">
            FULL-STACK DEVELOPER
          </span>
          <span className="font-mono text-[10px] text-[#737373]">|</span>
          <span className="font-mono text-[10px] text-[#737373] tracking-widest">
            SELF-TAUGHT
          </span>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-[#262626] rotate-45 opacity-20" />
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border border-[#a3e635] rotate-12 opacity-10" />
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  "AI Engineering",
  "Software Architecture",
  "Cybersecurity",
  "Web Development",
  "System Design",
  "Databases",
  "Programming",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".topic-tag",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".topics-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 lg:px-12 border-t border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs text-[#737373] tracking-widest">
            {'// ABOUT'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Bio */}
          <div className="about-content">
            <div className="font-mono text-sm md:text-base leading-relaxed mb-8">
              <span className="text-[#737373]">{'/**'}</span>
              <br />
              <span className="text-[#a3e635]">{' *'}</span>
              <span className="text-white">{' FULL-STACK DEVELOPER.'}</span>
              <br />
              <span className="text-[#a3e635]">{' *'}</span>
              <span className="text-white">{' WRITING ABOUT WHAT I BUILD AND LEARN.'}</span>
              <br />
              <span className="text-[#a3e635]">{' *'}</span>
              <span className="text-white">{' SELF-TAUGHT. CURIOUS. PRACTICAL.'}</span>
              <br />
              <span className="text-[#737373]">{' */'}</span>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed font-light mb-8">
              I&apos;m Ezra — a self-taught developer who believes the best way to
              understand something is to build it, break it, and write about it.
              This publication is where I share deep dives into the technical
              problems I encounter and the solutions I discover along the way.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed font-light mb-8">
              Every article here is written from real experience — production
              systems, debugging sessions, architecture decisions, and the kind
              of hard-won knowledge that doesn&apos;t come from tutorials.
            </p>

            {/* Topics */}
            <div className="topics-grid">
              <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
                TOPICS.MAP((T) =&gt;
              </span>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="topic-tag font-mono text-[10px] text-[#737373] px-3 py-1.5 border border-[#262626] hover:border-[#a3e635]/30 hover:text-[#a3e635] transition-all cursor-default"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-[#111111] border border-[#262626] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#111111]">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#a3e635]/10 to-transparent" />

                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern
                      id="about-grid"
                      width="30"
                      height="30"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 30 0 L 0 0 0 30"
                        fill="none"
                        stroke="#a3e635"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#about-grid)" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-6xl text-[#262626] mb-4">
                      EZ
                    </div>
                    <div className="font-mono text-xs text-[#737373]">
                      &lt;EZRA.ODYN /&gt;
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                  AUTHOR: EZRA ODYN
                </span>
                <span className="font-mono text-[10px] text-[#a3e635]">
                  SELF-TAUGHT
                </span>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#a3e635] text-[#0a0a0a] font-mono text-[10px] px-3 py-1 tracking-widest">
              BUILDING IN PUBLIC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

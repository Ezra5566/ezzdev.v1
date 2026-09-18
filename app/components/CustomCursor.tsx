"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has pointer (not touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Move dot immediately
      gsap.to(cursorDotRef.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: "power2.out",
      });

      // Move ring with delay
      gsap.to(cursorRingRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Handle hover states
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  // Update cursor size on hover
  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRingRef.current, {
        scale: 1.5,
        borderColor: "#a3e635",
        duration: 0.2,
      });
      gsap.to(cursorDotRef.current, {
        scale: 0.5,
        duration: 0.2,
      });
    } else {
      gsap.to(cursorRingRef.current, {
        scale: 1,
        borderColor: "#a3e635",
        duration: 0.2,
      });
      gsap.to(cursorDotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    }
  }, [isHovering]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[#a3e635] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-[#a3e635] rounded-full pointer-events-none z-[9998] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}

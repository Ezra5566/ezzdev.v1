"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { services, getCategoryById } from "../../../data/services";

gsap.registerPlugin(ScrollTrigger);

const getWhatsAppLink = (phone: string, message?: string) => {
  const base = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export default function ServiceDetailPage() {
  const params = useParams();
  const pageRef = useRef<HTMLDivElement>(null);

  const service = services.find((s) => s.slug === params.slug);
  const category = service
    ? getCategoryById(service.category)
    : undefined;

  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-detail-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".service-detail-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-detail-content",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <main className="relative min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="pt-32 pb-24 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="font-mono text-xs text-[#737373] tracking-widest">
              SERVICE_NOT_FOUND( )
            </span>
            <div className="mt-8">
              <Link
                href="/services"
                className="font-mono text-xs text-[#a3e635] hover:text-[#bef264] transition-colors flex items-center gap-2 justify-center"
              >
                <ArrowLeft size={14} />
                BACK_TO_SERVICES( )
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden"
    >
      <CustomCursor />
      <Navigation />

      <div className="relative z-10 pt-24 pb-24 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto">
          {/* Back */}
          <div className="mb-12">
            <Link
              href="/services"
              className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest flex items-center gap-2"
            >
              <ArrowLeft size={12} />
              ALL_SERVICES( )
            </Link>
          </div>

          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] text-[#737373] tracking-widest px-2 py-1 border border-[#262626]">
                {category?.name || service.category.toUpperCase()}
              </span>
            </div>
            <h1 className="service-detail-title font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-[#737373] font-light leading-relaxed max-w-2xl">
              {service.tagline}
            </p>
          </header>

          {/* Description */}
          <div className="service-detail-content mb-16">
            <p className="text-sm text-[#a3a3a3] leading-relaxed font-light text-lg">
              {service.description}
            </p>
          </div>

          {/* Who It's For */}
          <div className="service-detail-content mb-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
              WHO_ITS_FOR:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.forWhom.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#a3a3a3]"
                >
                  <ChevronRight
                    size={14}
                    className="text-[#a3e635] mt-0.5 flex-shrink-0"
                  />
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="service-detail-content mb-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
              WHAT_WE_OFFER:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2 text-sm text-[#a3a3a3]"
                >
                  <Check
                    size={14}
                    className="text-[#a3e635] mt-0.5 flex-shrink-0"
                  />
                  <span className="font-light">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="service-detail-content mb-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
              WHAT_YOU_GET:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables.map((del) => (
                <div
                  key={del}
                  className="flex items-start gap-2 text-sm text-[#a3a3a3]"
                >
                  <Check
                    size={14}
                    className="text-[#a3e635] mt-0.5 flex-shrink-0"
                  />
                  <span className="font-light">{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div className="service-detail-content mb-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
              COMPLEXITY_LEVELS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.complexity.map((level) => (
                <div
                  key={level}
                  className="p-4 border border-[#262626] bg-[#111111]"
                >
                  <span className="text-sm text-[#a3a3a3] font-light">
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-6">
              HOW_WE_WORK:
            </span>
            <div className="process-steps space-y-0">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="process-step flex gap-6 p-6 border-l-2 border-[#262626] hover:border-[#a3e635] transition-colors"
                >
                  <div className="flex-shrink-0">
                    <span className="font-mono text-2xl text-[#a3e635] font-bold">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#737373] font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border border-[#262626] bg-[#111111] p-8 lg:p-12 text-center">
            <h3 className="font-mono text-xl text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-sm text-[#737373] font-light mb-8 max-w-md mx-auto">
              Tell us about your project and we&apos;ll get back to you with a
              detailed quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services#quote"
                className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center gap-2"
              >
                GET_A_QUOTE( )
                <ArrowRight size={14} />
              </Link>
              <a
                href={getWhatsAppLink(
                  "+254705156757",
                  `Hello, I'm interested in ${service.title}. I'd like to discuss a project.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#20bd5a] transition-colors flex items-center gap-2"
              >
                <MessageCircle size={14} />
                WHATSAPP_US( )
              </a>
            </div>
          </div>

          {/* Related Services */}
          <div className="mt-16">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-6">
              RELATED_SERVICES:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {services
                .filter(
                  (s) => s.category === service.category && s.slug !== service.slug
                )
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="p-4 border border-[#262626] hover:border-[#a3e635]/30 transition-all group"
                  >
                    <h4 className="font-mono text-xs text-white group-hover:text-[#a3e635] transition-colors mb-2">
                      {related.title}
                    </h4>
                    <p className="text-[10px] text-[#737373] font-light">
                      {related.tagline}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

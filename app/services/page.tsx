"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  TrendingUp,
  Palette,
  Video,
  Cpu,
  ArrowRight,
  MessageCircle,
  Phone,
  Send,
  ChevronRight,
  Check,

} from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import {
  serviceCategories,
  services,
  teamMembers,
} from "../../data/services";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={24} />,
  "trending-up": <TrendingUp size={24} />,
  palette: <Palette size={24} />,
  video: <Video size={24} />,
  cpu: <Cpu size={24} />,
};

const quoteSteps = [
  {
    id: "service",
    question: "What do you need?",
    options: [
      "Website",
      "Web Application",
      "E-Commerce",
      "Marketing",
      "Graphics & Design",
      "Video & Media",
      "Software & AI",
      "Other",
    ],
  },
  {
    id: "complexity",
    question: "What level of complexity?",
    options: ["Simple", "Business", "Advanced", "Custom"],
  },
  {
    id: "features",
    question: "What features do you need?",
    options: [] as string[],
  },
];

const featureOptions: Record<string, string[]> = {
  Website: [
    "Landing page",
    "Multi-page site",
    "Blog/CMS",
    "Contact forms",
    "SEO",
    "Analytics",
    "Mobile responsive",
    "Custom design",
  ],
  "Web Application": [
    "User authentication",
    "Database",
    "Dashboard",
    "Real-time features",
    "API integration",
    "Admin panel",
    "File uploads",
    "Notifications",
  ],
  "E-Commerce": [
    "Product catalog",
    "Shopping cart",
    "Payment processing",
    "Inventory management",
    "Order tracking",
    "Customer accounts",
    "Multi-vendor",
    "Subscriptions",
  ],
  Marketing: [
    "Social media management",
    "SEO",
    "Google Ads",
    "Content creation",
    "Email marketing",
    "Analytics",
    "Brand strategy",
    "Influencer campaigns",
  ],
  "Graphics & Design": [
    "Logo design",
    "Brand identity",
    "Business cards",
    "Social media graphics",
    "Posters/Flyers",
    "UI/UX design",
    "Marketing materials",
    "Presentations",
  ],
  "Video & Media": [
    "Video editing",
    "Motion graphics",
    "Social media videos",
    "Promotional videos",
    "Product videos",
    "Subtitles/captions",
    "Animation",
    "Live action",
  ],
  "Software & AI": [
    "AI chatbot",
    "Automation",
    "API development",
    "Data analysis",
    "Custom software",
    "System integration",
    "Cloud deployment",
    "Security",
  ],
  Other: [
    "Custom project",
    "Consultation",
    "Technical audit",
    "Not sure yet",
    "Need guidance",
    "Other",
  ],
};

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [quoteStep, setQuoteStep] = useState(0);
  const [quoteData, setQuoteData] = useState({
    service: "",
    complexity: "",
    features: [] as string[],
    description: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    contactMethod: "whatsapp",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
    contactMethod: "whatsapp",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hero-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".services-hero-sub",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        }
      );
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".categories-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleQuoteSelect = (value: string) => {
    if (quoteStep === 0) {
      setQuoteData({ ...quoteData, service: value, features: [] });
      setQuoteStep(1);
    } else if (quoteStep === 1) {
      setQuoteData({ ...quoteData, complexity: value });
      setQuoteStep(2);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    const features = quoteData.features.includes(feature)
      ? quoteData.features.filter((f) => f !== feature)
      : [...quoteData.features, feature];
    setQuoteData({ ...quoteData, features });
  };

  const handleQuoteSubmit = () => {
    setQuoteSubmitted(true);
  };

  const handleContactSubmit = () => {
    setContactSubmitted(true);
  };

  const getWhatsAppLink = (
    phone: string,
    message?: string
  ) => {
    const base = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
    return message
      ? `${base}?text=${encodeURIComponent(message)}`
      : base;
  };

  const getServicesByCategory = (catId: string) => {
    return services.filter((s) => s.category === catId);
  };

  return (
    <main
      ref={heroRef}
      className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden"
    >
      <CustomCursor />
      <Navigation />

      <div className="relative z-10">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-8">
              <span className="font-mono text-xs text-[#737373] tracking-widest">
                {'// TECH & CREATIVE SERVICES'}
              </span>
            </div>
            <h1 className="services-hero-title font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8">
              <span className="text-white">BUILD.</span>{" "}
              <span className="text-[#a3e635]">GROW.</span>{" "}
              <span className="text-white">CREATE.</span>
            </h1>
            <p className="services-hero-sub max-w-2xl text-sm md:text-base text-[#737373] leading-relaxed font-light mb-12">
              From websites to AI, marketing to motion graphics — we handle
              the technology and creative work so you can focus on your
              business. Based in Kenya, serving clients everywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#quote"
                className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-all duration-300 flex items-center gap-2"
              >
                GET_A_QUOTE( )
                <ArrowRight size={14} />
              </a>
              <a
                href="#categories"
                className="border border-[#262626] text-[#737373] font-mono text-xs tracking-widest px-6 py-3 hover:text-white hover:border-[#404040] transition-colors"
              >
                EXPLORE_SERVICES( )
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ CATEGORIES ═══════════════ */}
        <section
          id="categories"
          className="py-24 px-6 lg:px-12 border-t border-[#262626]"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs text-[#737373] tracking-widest">
                  {'// SERVICES'}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-mono text-2xl md:text-3xl text-white">
                  <span className="text-[#a3e635]">EXPORT</span>
                  <span className="text-white"> { "{ " }SERVICES{ " }" }</span>
                </h2>
              </div>
            </div>

            <div className="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="category-card group border border-[#262626] bg-[#111111] p-8 hover:border-[color:var(--cat-color)]/30 transition-all duration-300 relative overflow-hidden"
                  style={{ ["--cat-color" as string]: cat.color }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: cat.color }}
                  />

                  <div className="relative">
                    <div
                      className="w-12 h-12 border flex items-center justify-center mb-6 transition-colors duration-300"
                      style={{
                        borderColor: `${cat.color}33`,
                        color: cat.color,
                      }}
                    >
                      {iconMap[cat.icon]}
                    </div>

                    <h3
                      className="font-mono text-xl font-bold mb-2 transition-colors"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h3>
                    <p className="font-mono text-[10px] text-[#737373] tracking-widest mb-4">
                      {cat.tagline}
                    </p>
                    <p className="text-sm text-[#737373] leading-relaxed font-light mb-6">
                      {cat.description}
                    </p>

                    {/* Services in this category */}
                    <div className="space-y-2 mb-6">
                      {getServicesByCategory(cat.id)
                        .slice(0, 4)
                        .map((svc) => (
                          <Link
                            key={svc.slug}
                            href={`/services/${svc.slug}`}
                            className="flex items-center justify-between text-xs text-[#a3a3a3] hover:text-white transition-colors group/link"
                          >
                            <span className="font-light">{svc.title}</span>
                            <ChevronRight
                              size={12}
                              className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                              style={{ color: cat.color }}
                            />
                          </Link>
                        ))}
                    </div>

                    <Link
                      href={`/services/${getServicesByCategory(cat.id)[0]?.slug}`}
                      className="font-mono text-[10px] tracking-widest flex items-center gap-2 transition-colors"
                      style={{ color: cat.color }}
                    >
                      EXPLORE( ) <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ WEB DEV PRICING ═══════════════ */}
        <section className="py-24 px-6 lg:px-12 border-t border-[#262626]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs text-[#737373] tracking-widest">
                  {'// PRICING'}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-mono text-2xl md:text-3xl text-white mb-4">
                  <span className="text-[#a3e635]">CONST</span>
                  <span className="text-white"> WEB_DEV{ "{"} </span>
                </h2>
                <p className="text-sm text-[#737373] font-light max-w-xl">
                  Pricing depends on project complexity. Select your level
                  and request a custom quote.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#262626]">
              {[
                {
                  tier: "STARTER",
                  desc: "Simple informational website",
                  examples: [
                    "Personal website",
                    "Small business site",
                    "Landing page",
                    "Basic company site",
                  ],
                  color: "#a3e635",
                },
                {
                  tier: "BUSINESS",
                  desc: "More pages and functionality",
                  examples: [
                    "Business website",
                    "Booking functionality",
                    "Forms & CMS",
                    "Advanced design",
                  ],
                  color: "#60a5fa",
                },
                {
                  tier: "ADVANCED",
                  desc: "Complex applications",
                  examples: [
                    "E-commerce",
                    "Dashboards",
                    "Membership systems",
                    "Custom databases",
                  ],
                  color: "#fbbf24",
                },
                {
                  tier: "CUSTOM",
                  desc: "Individual quotation required",
                  examples: [
                    "Custom web apps",
                    "Enterprise systems",
                    "AI-powered apps",
                    "Complex platforms",
                  ],
                  color: "#f472b6",
                },
              ].map((tier) => (
                <div
                  key={tier.tier}
                  className="bg-[#0a0a0a] p-8 hover:bg-[#111111] transition-colors group"
                >
                  <div
                    className="font-mono text-2xl font-bold mb-2"
                    style={{ color: tier.color }}
                  >
                    {tier.tier}
                  </div>
                  <p className="text-xs text-[#737373] font-light mb-6">
                    {tier.desc}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {tier.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-xs text-[#a3a3a3]"
                      >
                        <Check size={12} style={{ color: tier.color }} />
                        <span className="font-light">{ex}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    className="font-mono text-[10px] tracking-widest flex items-center gap-2 transition-colors"
                    style={{ color: tier.color }}
                  >
                    GET_QUOTE( ) <ArrowRight size={12} />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-4 font-mono text-xs text-[#737373] tracking-widest">
              {'} // Pricing is project-based. Request a quote for exact pricing.'}
            </div>
          </div>
        </section>

        {/* ═══════════════ INTERACTIVE QUOTE ═══════════════ */}
        <section
          id="quote"
          className="py-24 px-6 lg:px-12 border-t border-[#262626]"
        >
          <div className="max-w-[800px] mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#737373] tracking-widest">
                {'// INTERACTIVE_QUOTE'}
              </span>
            </div>

            {quoteSubmitted ? (
              <div className="border border-[#a3e635]/30 bg-[#111111] p-12 text-center">
                <div className="w-16 h-16 border border-[#a3e635] flex items-center justify-center mx-auto mb-6">
                  <Check size={24} className="text-[#a3e635]" />
                </div>
                <h3 className="font-mono text-xl text-white mb-4">
                  Quote Request Received
                </h3>
                <p className="text-sm text-[#737373] font-light mb-6">
                  We&apos;ll review your project details and get back to you
                  within 24 hours.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={getWhatsAppLink(
                      "+254705156757",
                      `Hi, I just submitted a quote request. Service: ${quoteData.service}, Complexity: ${quoteData.complexity}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#20bd5a] transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={14} />
                    WHATSAPP_US( )
                  </a>
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setQuoteStep(0);
                      setQuoteData({
                        service: "",
                        complexity: "",
                        features: [],
                        description: "",
                        name: "",
                        email: "",
                        phone: "",
                        whatsapp: "",
                        contactMethod: "whatsapp",
                      });
                    }}
                    className="border border-[#262626] text-[#737373] font-mono text-xs tracking-widest px-6 py-3 hover:text-white hover:border-[#404040] transition-colors"
                  >
                    NEW_QUOTE( )
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-[#262626] bg-[#111111] p-8 lg:p-12">
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        step <= quoteStep
                          ? "bg-[#a3e635]"
                          : "bg-[#262626]"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                  STEP {quoteStep + 1} OF 5
                </span>

                {/* Step 0: Service */}
                {quoteStep === 0 && (
                  <div>
                    <h3 className="font-mono text-lg text-white mb-6">
                      {quoteSteps[0].question}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {quoteSteps[0].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuoteSelect(opt)}
                          className={`p-4 border text-left font-mono text-xs tracking-wider transition-all duration-200 hover:border-[#a3e635]/50 hover:bg-[#a3e635]/5 ${
                            quoteData.service === opt
                              ? "border-[#a3e635] bg-[#a3e635]/10 text-[#a3e635]"
                              : "border-[#262626] text-[#737373]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Complexity */}
                {quoteStep === 1 && (
                  <div>
                    <h3 className="font-mono text-lg text-white mb-6">
                      {quoteSteps[1].question}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {quoteSteps[1].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuoteSelect(opt)}
                          className={`p-4 border text-left font-mono text-xs tracking-wider transition-all duration-200 hover:border-[#a3e635]/50 hover:bg-[#a3e635]/5 ${
                            quoteData.complexity === opt
                              ? "border-[#a3e635] bg-[#a3e635]/10 text-[#a3e635]"
                              : "border-[#262626] text-[#737373]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setQuoteStep(0)}
                      className="mt-4 font-mono text-[10px] text-[#737373] hover:text-white transition-colors"
                    >
                      &lt; BACK( )
                    </button>
                  </div>
                )}

                {/* Step 2: Features */}
                {quoteStep === 2 && (
                  <div>
                    <h3 className="font-mono text-lg text-white mb-2">
                      What features do you need?
                    </h3>
                    <p className="font-mono text-[10px] text-[#737373] tracking-widest mb-6">
                      SELECT ALL THAT APPLY
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                      {(featureOptions[quoteData.service] || featureOptions["Other"]).map(
                        (feat) => (
                          <button
                            key={feat}
                            onClick={() => handleFeatureToggle(feat)}
                            className={`p-3 border text-left font-mono text-[10px] tracking-wider transition-all duration-200 ${
                              quoteData.features.includes(feat)
                                ? "border-[#a3e635] bg-[#a3e635]/10 text-[#a3e635]"
                                : "border-[#262626] text-[#737373] hover:border-[#404040]"
                            }`}
                          >
                            {feat}
                          </button>
                        )
                      )}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setQuoteStep(3)}
                        className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center gap-2"
                      >
                        NEXT( ) <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => setQuoteStep(1)}
                        className="font-mono text-[10px] text-[#737373] hover:text-white transition-colors"
                      >
                        &lt; BACK( )
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {quoteStep === 3 && (
                  <div>
                    <h3 className="font-mono text-lg text-white mb-6">
                      Tell us about your project
                    </h3>
                    <textarea
                      value={quoteData.description}
                      onChange={(e) =>
                        setQuoteData({
                          ...quoteData,
                          description: e.target.value,
                        })
                      }
                      rows={6}
                      className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors resize-none leading-relaxed mb-6"
                      placeholder="Describe your project, goals, timeline, budget range..."
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() => setQuoteStep(4)}
                        className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center gap-2"
                      >
                        NEXT( ) <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => setQuoteStep(2)}
                        className="font-mono text-[10px] text-[#737373] hover:text-white transition-colors"
                      >
                        &lt; BACK( )
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Details */}
                {quoteStep === 4 && (
                  <div>
                    <h3 className="font-mono text-lg text-white mb-6">
                      How can we reach you?
                    </h3>
                    <div className="space-y-4 mb-6">
                      <input
                        type="text"
                        value={quoteData.name}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, name: e.target.value })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        value={quoteData.email}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, email: e.target.value })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={quoteData.phone}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, phone: e.target.value })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Phone"
                      />
                      <input
                        type="tel"
                        value={quoteData.whatsapp}
                        onChange={(e) =>
                          setQuoteData({
                            ...quoteData,
                            whatsapp: e.target.value,
                          })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="WhatsApp number (optional)"
                      />

                      {/* Preferred contact method */}
                      <div>
                        <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                          PREFERRED CONTACT:
                        </span>
                        <div className="flex gap-3">
                          {["whatsapp", "email", "phone"].map((m) => (
                            <button
                              key={m}
                              onClick={() =>
                                setQuoteData({
                                  ...quoteData,
                                  contactMethod: m,
                                })
                              }
                              className={`font-mono text-[10px] tracking-widest px-4 py-2 border transition-all ${
                                quoteData.contactMethod === m
                                  ? "bg-[#a3e635]/10 border-[#a3e635] text-[#a3e635]"
                                  : "border-[#262626] text-[#737373] hover:text-white"
                              }`}
                            >
                              {m.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleQuoteSubmit}
                        className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center gap-2"
                      >
                        <Send size={14} />
                        SUBMIT_QUOTE( )
                      </button>
                      <button
                        onClick={() => setQuoteStep(3)}
                        className="font-mono text-[10px] text-[#737373] hover:text-white transition-colors"
                      >
                        &lt; BACK( )
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════ TEAM ═══════════════ */}
        <section
          id="team"
          className="py-24 px-6 lg:px-12 border-t border-[#262626]"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs text-[#737373] tracking-widest">
                  {'// TEAM'}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-mono text-2xl md:text-3xl text-white">
                  <span className="text-[#a3e635]">WHO</span>
                  <span className="text-white"> WE ARE</span>
                </h2>
              </div>
            </div>

            <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="team-card border border-[#262626] bg-[#111111] p-8 hover:border-[#a3e635]/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 border border-[#262626] flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-lg text-[#a3e635]">
                        {member.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-mono text-sm text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[10px] text-[#a3e635] tracking-widest mb-3">
                        {member.role}
                      </p>
                      <p className="text-xs text-[#737373] font-light leading-relaxed">
                        {member.description}
                      </p>
                      {member.link && (
                        <a
                          href={member.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-[#a3e635] hover:text-[#bef264] tracking-widest mt-3 inline-flex items-center gap-1 transition-colors"
                        >
                          {member.linkLabel || 'Learn more'} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <section
          id="contact"
          className="py-24 px-6 lg:px-12 border-t border-[#262626]"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs text-[#737373] tracking-widest">
                  {'// CONTACT'}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-mono text-2xl md:text-3xl text-white mb-4">
                  <span className="text-[#a3e635]">START</span>
                  <span className="text-white"> A PROJECT</span>
                </h2>
                <p className="text-sm text-[#737373] font-light">
                  Tell us what you&apos;re building. We&apos;ll get back to you
                  within 24 hours.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Quick Contact */}
              <div>
                <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-6">
                  QUICK_CONTACT:
                </span>

                <div className="space-y-4 mb-8">
                  <a
                    href={getWhatsAppLink(
                      "+254705156757",
                      "Hello, I found your website and would like to discuss a project."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-[#262626] hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                      <MessageCircle
                        size={18}
                        className="text-[#25D366]"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-xs text-white block">
                        WhatsApp — Ezra Odyn
                      </span>
                      <span className="font-mono text-[10px] text-[#737373]">
                        +254 705 156 757
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#737373] group-hover:text-[#25D366] transition-colors"
                    />
                  </a>

                  <a
                    href={getWhatsAppLink(
                      "+254780142171",
                      "Hello, I found your website and would like to discuss a project."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-[#262626] hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                      <MessageCircle
                        size={18}
                        className="text-[#25D366]"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-xs text-white block">
                        WhatsApp — Mwenda
                      </span>
                      <span className="font-mono text-[10px] text-[#737373]">
                        CEO, RedAppleKE — +254 780 142 171
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#737373] group-hover:text-[#25D366] transition-colors"
                    />
                  </a>

                  <a
                    href={`tel:+254705156757`}
                    className="flex items-center gap-4 p-4 border border-[#262626] hover:border-[#a3e635]/30 hover:bg-[#a3e635]/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center">
                      <Phone size={18} className="text-[#a3e635]" />
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-xs text-white block">
                        Call — Ezra Odyn
                      </span>
                      <span className="font-mono text-[10px] text-[#737373]">
                        +254 705 156 757
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#737373] group-hover:text-[#a3e635] transition-colors"
                    />
                  </a>
                </div>

                {/* Process */}
                <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-4">
                  HOW_IT_WORKS:
                </span>
                <div className="space-y-3">
                  {[
                    "Reach out via WhatsApp or the form",
                    "We discuss your project and requirements",
                    "You receive a detailed quote",
                    "We start building upon approval",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono text-[10px] text-[#a3e635] mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-[#737373] font-light">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-6">
                  SEND_MESSAGE:
                </span>

                {contactSubmitted ? (
                  <div className="border border-[#a3e635]/30 bg-[#111111] p-8 text-center">
                    <Check size={24} className="text-[#a3e635] mx-auto mb-4" />
                    <h4 className="font-mono text-sm text-white mb-2">
                      Message Sent
                    </h4>
                    <p className="text-xs text-[#737373] font-light mb-4">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          description: "",
                          budget: "",
                          contactMethod: "whatsapp",
                        });
                      }}
                      className="font-mono text-[10px] text-[#a3e635] hover:text-[#bef264] transition-colors"
                    >
                      SEND_ANOTHER( )
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Email"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                        className="bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="Phone"
                      />
                      <select
                        value={contactForm.service}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            service: e.target.value,
                          })
                        }
                        className="bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                      >
                        <option value="">Service needed</option>
                        <option value="web-development">Web Development</option>
                        <option value="web-applications">
                          Web Applications
                        </option>
                        <option value="e-commerce">E-Commerce</option>
                        <option value="marketing">Marketing</option>
                        <option value="social-media">Social Media</option>
                        <option value="graphics">Graphics & Design</option>
                        <option value="video">Video & Media</option>
                        <option value="ai">AI Integration</option>
                        <option value="software">Software</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <textarea
                      value={contactForm.description}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                    <input
                      type="text"
                      value={contactForm.budget}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          budget: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                      placeholder="Budget range (optional)"
                    />

                    <div>
                      <span className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                        PREFERRED CONTACT:
                      </span>
                      <div className="flex gap-3">
                        {["whatsapp", "email", "phone"].map((m) => (
                          <button
                            key={m}
                            onClick={() =>
                              setContactForm({
                                ...contactForm,
                                contactMethod: m,
                              })
                            }
                            className={`font-mono text-[10px] tracking-widest px-4 py-2 border transition-all ${
                              contactForm.contactMethod === m
                                ? "bg-[#a3e635]/10 border-[#a3e635] text-[#a3e635]"
                                : "border-[#262626] text-[#737373] hover:text-white"
                            }`}
                          >
                            {m.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleContactSubmit}
                      className="w-full bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      SEND_MESSAGE( )
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

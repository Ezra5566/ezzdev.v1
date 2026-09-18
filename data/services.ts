export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  deliverables: string[];
  complexity: string[];
  process: { step: string; title: string; description: string }[];
  forWhom: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  services: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "build",
    name: "BUILD",
    tagline: "Websites, applications, software, systems.",
    description:
      "From simple business websites to complex web applications and custom platforms. We build digital products that work.",
    icon: "code",
    color: "#a3e635",
    services: [
      "web-development",
      "web-applications",
      "e-commerce",
      "dashboards",
      "booking-systems",
      "api-development",
    ],
  },
  {
    id: "grow",
    name: "GROW",
    tagline: "Marketing, social media, advertising.",
    description:
      "Digital marketing strategies and social media management that drive real business growth. Practical, measurable results.",
    icon: "trending-up",
    color: "#60a5fa",
    services: ["digital-marketing", "social-media", "brand-promotion"],
  },
  {
    id: "create",
    name: "CREATE",
    tagline: "Graphics, branding, UI/UX, design.",
    description:
      "Visual identity, branding systems, and design work that communicates effectively and looks professional.",
    icon: "palette",
    color: "#f472b6",
    services: ["logo-branding", "ui-ux-design", "graphics-design"],
  },
  {
    id: "media",
    name: "MEDIA",
    tagline: "Video editing, promotional content, motion.",
    description:
      "Video production, editing, and motion graphics that capture attention and tell your story.",
    icon: "video",
    color: "#a78bfa",
    services: ["video-editing", "motion-graphics", "video-production"],
  },
  {
    id: "technology",
    name: "TECHNOLOGY",
    tagline: "AI, automation, APIs, cloud, consulting.",
    description:
      "Advanced technical services — AI integrations, automation, system architecture, and technical consulting.",
    icon: "cpu",
    color: "#fbbf24",
    services: [
      "ai-integration",
      "automation",
      "technical-consulting",
      "cybersecurity",
    ],
  },
];

export const services: Service[] = [
  // ─── BUILD ────────────────────────────────────────────────
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Websites that work. Not just look good.",
    description:
      "We build business websites, landing pages, and web applications — from simple informational sites to complex, database-backed platforms. Every project is built with performance, scalability, and maintainability in mind.",
    category: "build",
    icon: "globe",
    features: [
      "Custom business websites",
      "Landing pages & marketing sites",
      "Web applications & dashboards",
      "Booking & appointment systems",
      "School & organization systems",
      "Inventory & management systems",
      "Website redesigns",
      "Website maintenance & support",
    ],
    deliverables: [
      "Fully responsive website",
      "Mobile-optimized experience",
      "SEO-ready structure",
      "Admin panel (if needed)",
      "Analytics integration",
      "Source code & documentation",
    ],
    complexity: [
      "Starter — Simple informational site",
      "Business — Multiple pages, forms, CMS",
      "Advanced — Dashboards, databases, integrations",
      "Custom — Complex platforms, enterprise features",
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We understand your goals, audience, and requirements. What does your business need?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "We create wireframes and visual concepts that match your brand and serve your users.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "We develop your site with clean, maintainable code. Regular updates throughout.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "We deploy, test, and ensure everything works. Then we hand it over — or keep supporting you.",
      },
    ],
    forWhom: [
      "Small businesses needing an online presence",
      "Startups launching a product",
      "Organizations needing internal tools",
      "Anyone who needs a website that actually works",
    ],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    tagline: "Custom software that solves real problems.",
    description:
      "Beyond websites — full web applications with user accounts, databases, real-time features, and complex business logic. Built for scale, designed for usability.",
    category: "build",
    icon: "layers",
    features: [
      "Custom web applications",
      "SaaS platforms",
      "Real-time collaborative tools",
      "User authentication & roles",
      "Database design & management",
      "API integrations",
      "Progressive Web Apps (PWA)",
      "Performance optimization",
    ],
    deliverables: [
      "Production-ready application",
      "User authentication system",
      "Database architecture",
      "API documentation",
      "Deployment & hosting setup",
      "Source code ownership",
    ],
    complexity: [
      "Starter — Single-purpose tool",
      "Business — Multi-user with roles",
      "Advanced — Real-time, complex logic",
      "Custom — Enterprise-scale platform",
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "Deep dive into your problem space. What workflow are you improving?",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Design the system architecture, data models, and technical approach.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Iterative development with regular demos. You see progress every week.",
      },
      {
        step: "04",
        title: "Deploy & Support",
        description:
          "Production deployment, monitoring, and ongoing support as needed.",
      },
    ],
    forWhom: [
      "Businesses with custom workflow needs",
      "Teams needing internal tools",
      "Entrepreneurs building SaaS products",
      "Organizations replacing manual processes",
    ],
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    tagline: "Online stores that convert.",
    description:
      "Full-featured e-commerce solutions — from product catalogs to payment processing, inventory management, and order fulfillment. Built for growth.",
    category: "build",
    icon: "shopping-cart",
    features: [
      "Product catalog & management",
      "Payment processing (M-Pesa, cards)",
      "Inventory tracking",
      "Order management system",
      "Customer accounts",
      "Analytics & reporting",
      "Multi-vendor support",
      "Custom checkout flows",
    ],
    deliverables: [
      "Complete e-commerce platform",
      "Payment integration",
      "Admin dashboard",
      "Mobile-responsive storefront",
      "Order management system",
      "Analytics dashboard",
    ],
    complexity: [
      "Starter — Simple product catalog",
      "Business — Full store with inventory",
      "Advanced — Multi-vendor, subscriptions",
      "Custom — Enterprise e-commerce platform",
    ],
    process: [
      {
        step: "01",
        title: "Strategy",
        description:
          "What are you selling? Who are your customers? What's the buying experience?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Storefront design that showcases products and guides purchases.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Full e-commerce development with payment, inventory, and order systems.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Testing, deployment, and go-live support. We're there when you launch.",
      },
    ],
    forWhom: [
      "Businesses selling products online",
      "Entrepreneurs starting e-commerce",
      "Existing stores needing better platforms",
      "Multi-vendor marketplace operators",
    ],
  },
  {
    slug: "dashboards",
    title: "Dashboards & Analytics",
    tagline: "See your data. Make better decisions.",
    description:
      "Custom dashboards and analytics platforms that transform raw data into actionable insights. Real-time monitoring, reporting, and visualization.",
    category: "build",
    icon: "bar-chart",
    features: [
      "Real-time data visualization",
      "Custom reporting tools",
      "KPI tracking & alerts",
      "Data aggregation from multiple sources",
      "Export & sharing capabilities",
      "Role-based access control",
      "Mobile-responsive dashboards",
      "Automated reporting",
    ],
    deliverables: [
      "Interactive dashboard",
      "Real-time data feeds",
      "Custom report builder",
      "User management",
      "Data source integrations",
      "Documentation & training",
    ],
    complexity: [
      "Starter — Single-page dashboard",
      "Business — Multi-view with reports",
      "Advanced — Real-time, multi-source",
      "Custom — Enterprise analytics platform",
    ],
    process: [
      {
        step: "01",
        title: "Data Audit",
        description:
          "What data do you have? What decisions do you need to make?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Dashboard layouts that surface the right information at the right time.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Data pipelines, visualization, and interactive components.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Performance tuning, user feedback, and continuous improvement.",
      },
    ],
    forWhom: [
      "Businesses tracking KPIs",
      "Teams monitoring operations",
      "Organizations with multiple data sources",
      "Decision-makers who need real-time info",
    ],
  },
  {
    slug: "booking-systems",
    title: "Booking & Scheduling",
    tagline: "Let customers book. Automatically.",
    description:
      "Appointment scheduling, booking systems, and reservation platforms. Automate the back-and-forth and let your customers book when it works for them.",
    category: "build",
    icon: "calendar",
    features: [
      "Online appointment booking",
      "Calendar integration",
      "Automated reminders",
      "Payment at booking",
      "Multi-staff scheduling",
      "Recurring appointments",
      "Waitlist management",
      "Customer management",
    ],
    deliverables: [
      "Booking website/app",
      "Calendar system",
      "Notification system",
      "Payment integration",
      "Admin dashboard",
      "Customer portal",
    ],
    complexity: [
      "Starter — Simple appointment form",
      "Business — Calendar + payments",
      "Advanced — Multi-location, staff",
      "Custom — Full reservation platform",
    ],
    process: [
      {
        step: "01",
        title: "Understand",
        description:
          "How does your booking process work today? What's painful about it?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "The ideal booking flow for your customers and your team.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Booking system with calendar, notifications, and payments.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Testing with real scenarios, then go-live with support.",
      },
    ],
    forWhom: [
      "Service businesses (salons, clinics, consultants)",
      "Organizations managing events",
      "Any business where scheduling matters",
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    tagline: "Connect everything. Automate everything.",
    description:
      "Custom APIs, system integrations, and data pipelines that connect your tools and automate your workflows. RESTful, GraphQL, webhooks — we build the plumbing.",
    category: "build",
    icon: "zap",
    features: [
      "RESTful API design & development",
      "GraphQL APIs",
      "Webhook integrations",
      "Third-party API connections",
      "Data synchronization",
      "Rate limiting & security",
      "API documentation",
      "Performance optimization",
    ],
    deliverables: [
      "Production-ready API",
      "API documentation",
      "Integration guides",
      "Testing suite",
      "Monitoring & logging",
      "Security audit",
    ],
    complexity: [
      "Starter — Simple REST API",
      "Business — Multiple integrations",
      "Advanced — Real-time, microservices",
      "Custom — Enterprise API platform",
    ],
    process: [
      {
        step: "01",
        title: "Map",
        description:
          "What systems need to connect? What data flows where?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "API architecture, data models, and integration patterns.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "API development with proper error handling, security, and documentation.",
      },
      {
        step: "04",
        title: "Test & Deploy",
        description:
          "Thorough testing, documentation, and production deployment.",
      },
    ],
    forWhom: [
      "Businesses connecting multiple tools",
      "Teams building platform integrations",
      "Developers needing backend APIs",
      "Organizations automating data flows",
    ],
  },

  // ─── GROW ────────────────────────────────────────────────
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Marketing that actually reaches people.",
    description:
      "Strategic digital marketing that drives traffic, generates leads, and grows your business. No fluff — just practical strategies that work in the Kenyan and African market.",
    category: "grow",
    icon: "megaphone",
    features: [
      "Digital marketing strategy",
      "Search engine optimization (SEO)",
      "Google Ads & PPC campaigns",
      "Email marketing",
      "Content marketing",
      "Analytics & reporting",
      "Conversion optimization",
      "Market research",
    ],
    deliverables: [
      "Marketing strategy document",
      "Campaign setup & management",
      "Monthly performance reports",
      "SEO audit & recommendations",
      "Content calendar",
      "Analytics dashboard",
    ],
    complexity: [
      "Starter — Basic online presence",
      "Business — Multi-channel strategy",
      "Advanced — Full-funnel marketing",
      "Custom — Enterprise marketing operations",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Where are you now? What's working? What's not?",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "A clear marketing plan with goals, channels, and budgets.",
      },
      {
        step: "03",
        title: "Execute",
        description:
          "Launch campaigns, create content, and drive traffic.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Measure results, test what works, and double down on winners.",
      },
    ],
    forWhom: [
      "Businesses wanting more online visibility",
      "Startups needing customer acquisition",
      "Companies expanding their digital presence",
      "Any business ready to grow online",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    tagline: "Your social presence, handled.",
    description:
      "Complete social media management — content creation, posting, community management, and analytics. We keep your brand active and engaging across platforms.",
    category: "grow",
    icon: "share-2",
    features: [
      "Content creation & scheduling",
      "Community management",
      "Platform strategy (Instagram, TikTok, X, LinkedIn)",
      "Engagement & growth",
      "Social media analytics",
      "Influencer coordination",
      "Trend monitoring",
      "Crisis management",
    ],
    deliverables: [
      "Monthly content calendar",
      "Custom graphics & captions",
      "Platform management",
      "Engagement reports",
      "Growth analytics",
      "Strategy recommendations",
    ],
    complexity: [
      "Starter — 1-2 platforms, basic posting",
      "Business — Multi-platform with engagement",
      "Advanced — Full management + ads",
      "Custom — Enterprise social operations",
    ],
    process: [
      {
        step: "01",
        title: "Assess",
        description:
          "Your current social presence, audience, and competitors.",
      },
      {
        step: "02",
        title: "Plan",
        description:
          "Content strategy, posting schedule, and platform focus.",
      },
      {
        step: "03",
        title: "Create",
        description:
          "Design, write, and schedule content that resonates.",
      },
      {
        step: "04",
        title: "Engage",
        description:
          "Manage community, respond to interactions, and grow.",
      },
    ],
    forWhom: [
      "Businesses wanting consistent social presence",
      "Brands building online community",
      "Companies that don't have time for social media",
    ],
  },
  {
    slug: "brand-promotion",
    title: "Brand Promotion",
    tagline: "Get your brand noticed.",
    description:
      "Strategic brand promotion across digital channels. We help your business reach the right audience with the right message at the right time.",
    category: "grow",
    icon: "star",
    features: [
      "Brand awareness campaigns",
      "Social media advertising",
      "Content promotion",
      "Influencer partnerships",
      "Event promotion",
      "Product launches",
      "Reputation management",
      "Competitive positioning",
    ],
    deliverables: [
      "Promotion strategy",
      "Campaign creative assets",
      "Ad campaign management",
      "Performance reports",
      "Audience insights",
      "Competitor analysis",
    ],
    complexity: [
      "Starter — Basic brand awareness",
      "Business — Multi-channel promotion",
      "Advanced — Full campaign management",
      "Custom — Enterprise brand strategy",
    ],
    process: [
      {
        step: "01",
        title: "Define",
        description:
          "Your brand identity, target audience, and goals.",
      },
      {
        step: "02",
        title: "Plan",
        description:
          "Promotion strategy with channels, messaging, and budget.",
      },
      {
        step: "03",
        title: "Execute",
        description:
          "Launch campaigns, create assets, and drive visibility.",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "Track results, optimize campaigns, and report impact.",
      },
    ],
    forWhom: [
      "New businesses building brand awareness",
      "Companies launching new products",
      "Brands looking to stand out",
    ],
  },

  // ─── CREATE ────────────────────────────────────────────────
  {
    slug: "logo-branding",
    title: "Logo & Branding",
    tagline: "A brand that people remember.",
    description:
      "Logo design, brand identity systems, and visual language that makes your business look professional and memorable. From concept to complete brand guidelines.",
    category: "create",
    icon: "pen-tool",
    features: [
      "Logo design (concepts + revisions)",
      "Brand color palette",
      "Typography selection",
      "Brand guidelines document",
      "Business card design",
      "Letterhead & stationery",
      "Social media brand kit",
      "Brand usage rules",
    ],
    deliverables: [
      "Final logo (all formats)",
      "Brand guidelines PDF",
      "Color codes & typography specs",
      "Business card design",
      "Social media templates",
      "Source files (AI/PSD)",
    ],
    complexity: [
      "Starter — Logo + basic brand colors",
      "Business — Full brand identity",
      "Advanced — Complete brand system",
      "Custom — Enterprise rebrand",
    ],
    process: [
      {
        step: "01",
        title: "Brief",
        description:
          "Your business, audience, competitors, and what you want to communicate.",
      },
      {
        step: "02",
        title: "Concepts",
        description:
          "Multiple logo concepts and direction exploration.",
      },
      {
        step: "03",
        title: "Refine",
        description:
          "Iterate on the chosen direction until it's perfect.",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Final files, brand guidelines, and everything you need.",
      },
    ],
    forWhom: [
      "New businesses needing a brand",
      "Companies refreshing their identity",
      "Startups preparing for launch",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Design that works. Not just looks pretty.",
    description:
      "User interface and experience design that balances aesthetics with usability. We design digital products that people actually enjoy using.",
    category: "create",
    icon: "layout",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design",
      "Interaction design",
      "Design systems",
      "Usability testing",
      "Responsive design",
      "Accessibility considerations",
    ],
    deliverables: [
      "Wireframes & prototypes",
      "High-fidelity mockups",
      "Interactive prototype",
      "Design specifications",
      "Component library",
      "Handoff to developers",
    ],
    complexity: [
      "Starter — Single-page design",
      "Business — Multi-page application",
      "Advanced — Design system",
      "Custom — Enterprise product design",
    ],
    process: [
      {
        step: "01",
        title: "Research",
        description:
          "Understand your users, their needs, and their pain points.",
      },
      {
        step: "02",
        title: "Ideate",
        description:
          "Wireframes and information architecture that solves the problem.",
      },
      {
        step: "03",
        title: "Design",
        description:
          "Visual design that brings the solution to life.",
      },
      {
        step: "04",
        title: "Test",
        description:
          "Validate with real users, iterate, and deliver.",
      },
    ],
    forWhom: [
      "Teams building digital products",
      "Businesses redesigning existing apps",
      "Startups that need professional design",
    ],
  },
  {
    slug: "graphics-design",
    title: "Graphics & Design",
    tagline: "Visuals that communicate.",
    description:
      "Graphic design for all your business needs — posters, flyers, social media graphics, advertisements, and marketing materials. Professional, on-brand, effective.",
    category: "create",
    icon: "image",
    features: [
      "Poster & flyer design",
      "Social media graphics",
      "Advertisement creatives",
      "Marketing materials",
      "Presentation design",
      "Infographics",
      "Packaging design",
      "Event materials",
    ],
    deliverables: [
      "Print-ready files",
      "Social media assets",
      "Editable source files",
      "Multiple format exports",
      "Brand-consistent design",
      "Quick turnaround",
    ],
    complexity: [
      "Starter — Single design piece",
      "Business — Design package",
      "Advanced — Campaign assets",
      "Custom — Ongoing design support",
    ],
    process: [
      {
        step: "01",
        title: "Brief",
        description:
          "What do you need? Who is it for? What's the message?",
      },
      {
        step: "02",
        title: "Concept",
        description:
          "Initial design concepts based on your brief.",
      },
      {
        step: "03",
        title: "Refine",
        description:
          "Revisions and polish until you're happy.",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Final files in all the formats you need.",
      },
    ],
    forWhom: [
      "Businesses needing marketing materials",
      "Organizations planning events",
      "Anyone who needs professional graphics",
    ],
  },

  // ─── MEDIA ────────────────────────────────────────────────
  {
    slug: "video-editing",
    title: "Video Editing",
    tagline: "Footage becomes story.",
    description:
      "Professional video editing for social media, advertisements, business content, and personal projects. We turn raw footage into polished, engaging videos.",
    category: "media",
    icon: "film",
    features: [
      "Social media video editing",
      "Business advertisement editing",
      "Promotional video editing",
      "Product video editing",
      "YouTube content editing",
      "Podcast editing",
      "Color grading & correction",
      "Sound design & mixing",
    ],
    deliverables: [
      "Edited video (multiple formats)",
      "Social media cuts (vertical, square)",
      "Thumbnail design",
      "Subtitles/captions",
      "Audio enhancement",
      "Export in required formats",
    ],
    complexity: [
      "Starter — Short social clips",
      "Business — 2-5 minute promotional",
      "Advanced — Full production edit",
      "Custom — Multi-video campaign",
    ],
    process: [
      {
        step: "01",
        title: "Review",
        description:
          "We review your footage and understand the vision.",
      },
      {
        step: "02",
        title: "Edit",
        description:
          "Rough cut, then refined edit with music, effects, and color.",
      },
      {
        step: "03",
        title: "Feedback",
        description:
          "You review, we revise. Until it's right.",
      },
      {
        step: "04",
        title: "Export",
        description:
          "Final video in all formats you need.",
      },
    ],
    forWhom: [
      "Businesses creating video content",
      "Content creators needing editing",
      "Organizations producing promotional videos",
    ],
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics",
    tagline: "Static becomes dynamic.",
    description:
      "Animated graphics, logos, infographics, and visual effects that bring your content to life. Eye-catching motion for social media, presentations, and brand content.",
    category: "media",
    icon: "sparkles",
    features: [
      "Logo animation",
      "Animated infographics",
      "Social media motion graphics",
      "Text animation",
      "Explainer video animations",
      "Transition effects",
      "Data visualization animation",
      "Brand motion identity",
    ],
    deliverables: [
      "Animated video files",
      "Social media formats",
      "GIF exports",
      "Source project files",
      "Multiple resolution exports",
      "Brand animation toolkit",
    ],
    complexity: [
      "Starter — Simple logo/text animation",
      "Business — Animated social content",
      "Advanced — Full explainer animation",
      "Custom — Complete motion identity",
    ],
    process: [
      {
        step: "01",
        title: "Concept",
        description:
          "What needs to move? What story does the motion tell?",
      },
      {
        step: "02",
        title: "Storyboard",
        description:
          "We plan the animation sequence and timing.",
      },
      {
        step: "03",
        title: "Animate",
        description:
          "Bring the concept to life with smooth, purposeful motion.",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Final animation in all formats and resolutions.",
      },
    ],
    forWhom: [
      "Brands wanting to stand out",
      "Businesses creating social content",
      "Organizations needing animated explainers",
    ],
  },
  {
    slug: "video-production",
    title: "Video Production",
    tagline: "From concept to screen.",
    description:
      "Full video production services — planning, shooting, editing, and post-production. We handle the entire process so you can focus on your message.",
    category: "media",
    icon: "camera",
    features: [
      "Pre-production planning",
      "Script writing",
      "Video shooting",
      "Post-production editing",
      "Color grading",
      "Sound design & mixing",
      "Graphics & titles",
      "Multi-platform delivery",
    ],
    deliverables: [
      "Complete video production",
      "Script & storyboard",
      "Raw footage backup",
      "Edited final cut",
      "Multiple format exports",
      "Behind-the-scenes content",
    ],
    complexity: [
      "Starter — Single short video",
      "Business — Professional promo video",
      "Advanced — Multi-scene production",
      "Custom — Commercial/brand film",
    ],
    process: [
      {
        step: "01",
        title: "Pre-Production",
        description:
          "Script, storyboard, location scouting, and planning.",
      },
      {
        step: "02",
        title: "Production",
        description:
          "Shooting with professional equipment and direction.",
      },
      {
        step: "03",
        title: "Post-Production",
        description:
          "Editing, color, sound, graphics, and effects.",
      },
      {
        step: "04",
        title: "Delivery",
        description:
          "Final video in all formats, ready for your audience.",
      },
    ],
    forWhom: [
      "Businesses creating brand videos",
      "Organizations with events to document",
      "Companies needing professional content",
    ],
  },

  // ─── TECHNOLOGY ────────────────────────────────────────────
  {
    slug: "ai-integration",
    title: "AI Integration",
    tagline: "AI that works for your business.",
    description:
      "Practical AI integrations that solve real business problems. Chatbots, automation, data analysis, content generation — AI that actually delivers value, not just hype.",
    category: "technology",
    icon: "brain",
    features: [
      "AI chatbot development",
      "Content generation systems",
      "Data analysis & insights",
      "Process automation with AI",
      "Document processing",
      "Recommendation engines",
      "Custom AI model integration",
      "AI-powered search",
    ],
    deliverables: [
      "Working AI integration",
      "Training data preparation",
      "Performance benchmarks",
      "Documentation",
      "Monitoring & maintenance",
      "ROI reporting",
    ],
    complexity: [
      "Starter — Simple chatbot or AI feature",
      "Business — Multi-feature AI integration",
      "Advanced — Custom AI pipeline",
      "Custom — Enterprise AI platform",
    ],
    process: [
      {
        step: "01",
        title: "Assess",
        description:
          "Where can AI actually help your business? What's the ROI?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "AI architecture, data requirements, and integration plan.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Develop, train, and integrate the AI solution.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Monitor performance, retrain, and improve over time.",
      },
    ],
    forWhom: [
      "Businesses wanting to automate with AI",
      "Teams exploring AI for their workflow",
      "Organizations with data to leverage",
    ],
  },
  {
    slug: "automation",
    title: "Automation & Workflows",
    tagline: "Stop doing manually what machines can do.",
    description:
      "Business process automation, workflow optimization, and system integrations that save time and reduce errors. Automate the repetitive, focus on what matters.",
    category: "technology",
    icon: "workflow",
    features: [
      "Business process automation",
      "Workflow design & implementation",
      "Email automation",
      "Data entry automation",
      "Report generation automation",
      "Notification systems",
      "Integration automation",
      "Custom triggers & actions",
    ],
    deliverables: [
      "Automation workflows",
      "Integration setup",
      "Documentation",
      "Monitoring dashboards",
      "Error handling",
      "Maintenance plan",
    ],
    complexity: [
      "Starter — Single workflow automation",
      "Business — Multi-step automation",
      "Advanced — Cross-system automation",
      "Custom — Enterprise automation platform",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "What processes are repetitive? Where is time being wasted?",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Map the ideal automated workflow.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Implement automations with proper error handling.",
      },
      {
        step: "04",
        title: "Monitor",
        description:
          "Track performance and optimize over time.",
      },
    ],
    forWhom: [
      "Businesses with repetitive manual tasks",
      "Teams drowning in busywork",
      "Organizations scaling operations",
    ],
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    tagline: "Expert guidance for technical decisions.",
    description:
      "Technical consulting for businesses making technology decisions. Architecture reviews, technology selection, security audits, and strategic technical guidance.",
    category: "technology",
    icon: "message-circle",
    features: [
      "Technology strategy",
      "Architecture review",
      "Technology selection",
      "Security assessment",
      "Performance audit",
      "Scalability planning",
      "Code review",
      "Technical due diligence",
    ],
    deliverables: [
      "Technical assessment report",
      "Recommendations document",
      "Architecture diagrams",
      "Implementation roadmap",
      "Cost estimates",
      "Follow-up consultation",
    ],
    complexity: [
      "Starter — Quick consultation",
      "Business — Full technical audit",
      "Advanced — Architecture redesign",
      "Custom — Ongoing technical advisory",
    ],
    process: [
      {
        step: "01",
        title: "Understand",
        description:
          "Your business, goals, and current technical landscape.",
      },
      {
        step: "02",
        title: "Assess",
        description:
          "Deep technical analysis of your systems and needs.",
      },
      {
        step: "03",
        title: "Recommend",
        description:
          "Clear, actionable recommendations with priorities.",
      },
      {
        step: "04",
        title: "Support",
        description:
          "Ongoing guidance as you implement the recommendations.",
      },
    ],
    forWhom: [
      "Businesses making tech decisions",
      "Teams needing expert guidance",
      "Startups planning their tech stack",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Services",
    tagline: "Protect what matters.",
    description:
      "Technical cybersecurity services — security assessments, vulnerability testing, secure coding practices, and protection strategies. Practical security for real businesses.",
    category: "technology",
    icon: "shield",
    features: [
      "Security assessments",
      "Vulnerability testing",
      "Secure code review",
      "Penetration testing",
      "Security policy development",
      "Incident response planning",
      "Data protection compliance",
      "Security training",
    ],
    deliverables: [
      "Security assessment report",
      "Vulnerability findings",
      "Remediation recommendations",
      "Security policies",
      "Compliance checklist",
      "Training materials",
    ],
    complexity: [
      "Starter — Basic security review",
      "Business — Full security assessment",
      "Advanced — Penetration testing",
      "Custom — Enterprise security program",
    ],
    process: [
      {
        step: "01",
        title: "Assess",
        description:
          "Evaluate your current security posture and risks.",
      },
      {
        step: "02",
        title: "Test",
        description:
          "Identify vulnerabilities through testing and analysis.",
      },
      {
        step: "03",
        title: "Remediate",
        description:
          "Fix issues and implement security improvements.",
      },
      {
        step: "04",
        title: "Monitor",
        description:
          "Ongoing monitoring and security maintenance.",
      },
    ],
    forWhom: [
      "Businesses handling sensitive data",
      "Organizations needing compliance",
      "Any business that takes security seriously",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.category === categoryId);
}

export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.id === id);
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  link?: string;
  linkLabel?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Ezra Odyn",
    role: "Developer & Technical Lead",
    description:
      "Full-stack developer specializing in AI, web development, and system architecture. Self-taught, curious, and practical.",
    initials: "EO",
    link: "https://ezraodyn.vercel.app/about",
    linkLabel: "Who am I?",
  },
  {
    name: "Mwenda",
    role: "CEO — RedAppleKE",
    description:
      "Business strategy, client relations, and operations. Leading RedAppleKE's vision for digital transformation.",
    initials: "MW",
    link: "https://redappleke.com",
    linkLabel: "RedAppleKE",
  },
];

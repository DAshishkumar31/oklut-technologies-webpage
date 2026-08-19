import {
  Code2,
  CloudCog,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Compass,
  Megaphone,
  Globe,
  GraduationCap,
  CarFront,
  MonitorPlay,
  ShoppingCart,
  Building2,
} from "lucide-react";

export const COMPANY = {
  name: "Oklut Technologies",
  shortName: "OKLUT",
  tagline: "Digital driven IT solutions provider & trusted partner",
  phone: "+91-9014217124",
  phoneHref: "tel:+919014217124",
  email: "info@oklut.com",
  emailHref: "mailto:info@oklut.com",
  address:
    "Second Floor, Samridhi Vasyam, D No 1/98/9/3/23, Capital Pk Rd, Cyber Hills Colony, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081",
  city: "Hyderabad, India",
  founded: 2016,
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Careers", to: "/careers" },
];

export const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    summary:
      "Modern websites and CMS platforms designed to convert visitors into customers and scale with your business.",
    points: ["Custom websites & CMS", "E-commerce stores", "Performance & SEO-ready"],
    size: 4,
  },
  {
    id: "software-development",
    title: "Software Development",
    icon: Code2,
    summary:
      "End-to-end web applications, automation and B2B platforms — from API design to CI/CD and support.",
    points: ["Web applications & B2B platforms", "APIs, webservices & database design", "CI/CD & maintenance"],
    size: 2,
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    icon: Smartphone,
    summary:
      "Native iOS and Android apps that feel fast, polished and deeply integrated with your backend.",
    points: ["iPhone, iPad & Android apps"],
    size: 2,
  },
  {
    id: "cloud-digital",
    title: "Digital & Cloud Solutions",
    icon: CloudCog,
    summary:
      "Cloud migration, IoT pipelines and AI/ML services on AWS, Azure and Google Cloud — managed end to end.",
    points: ["Cloud migration & modernization", "API-led integrations", "IoT middleware & ML"],
    size: 4,
    dark: true,
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    icon: ShieldCheck,
    summary:
      "Protect systems, networks and programs from digital attacks with proactive security practices.",
    points: ["Vulnerability assessment", "Security hardening"],
    size: 3,
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: BarChart3,
    summary:
      "Turn raw data into actionable insight with the right tools, processes and reporting.",
    points: ["Dashboards & reporting", "Trend analysis"],
    size: 3,
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    icon: Compass,
    summary:
      "Affordable offshore consulting with skilled resources and flexible billing models that fit your roadmap.",
    points: ["Technology strategy", "Managed services", "Flexible billing models"],
    size: 2,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    summary:
      "A top-rated SEO & marketing team serving Education, Healthcare, Retail and more since 2016.",
    points: ["SEO, PPC & Google Ads", "Social media & email", "Branding & ORM"],
    size: 2,
    dark: true,
  },
];

export const PRODUCTS = [
  {
    id: "exam-system",
    title: "Online Learning & Examination System",
    icon: GraduationCap,
    description:
      "Admin controls student categories and publishes registered, unregistered and paid tests. Only approved student feedback reaches the front end.",
    tags: ["Education", "SaaS"],
  },
  {
    id: "vehicle-booking",
    title: "Vehicle Booking Platform",
    icon: CarFront,
    description:
      "Quick taxi booking for SMEs with vehicle listings, hourly packages, special fares, coupons and distance pricing.",
    tags: ["Travel", "Marketplace"],
  },
  {
    id: "lms",
    title: "LMS Application",
    icon: MonitorPlay,
    description:
      "A complete e-learning system with administration, documentation, tracking, reporting and delivery of training programs.",
    tags: ["Education", "Enterprise"],
  },
  {
    id: "ecommerce",
    title: "E-commerce Applications",
    icon: ShoppingCart,
    description:
      "Modern, user-friendly B2B & B2C commerce platforms tailored to your catalog, payments and fulfilment flow.",
    tags: ["Retail", "B2B / B2C"],
  },
  {
    id: "coworks",
    title: "Coworks CRM & Bookings",
    icon: Building2,
    description:
      "A platform helping entrepreneurs, startups and companies find and book the workspace that fits their needs.",
    tags: ["Proptech", "CRM"],
  },
];

export const STATS = [
  { value: 1056, suffix: "+", label: "Happy clients" },
  { value: 328, suffix: "+", label: "Projects delivered" },
  { value: 23, suffix: "", label: "Industry awards" },
  { value: 120, suffix: "+", label: "Team of specialists" },
];

export const BADGES = [
  { title: "Award Winning", description: "Recognised quality, delivered consistently." },
  { title: "Professional Staff", description: "A senior team you can rely on." },
  { title: "24/7 Support", description: "Always reachable when it matters." },
  { title: "Fair Prices", description: "Transparent, honest engagement models." },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map your business goals, users and constraints into a clear technical roadmap before a single line of code.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture, UX and visual direction come together in prototypes you can touch, test and approve.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Agile sprints with continuous integration, weekly demos and quality gates keep delivery transparent.",
  },
  {
    step: "04",
    title: "Scale",
    description:
      "Launch is the start — we provide 24/7 support, cloud operations and growth iterations for the long run.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ayesha",
    role: "Sr. Consultant",
    quote:
      "This company has the best product and is providing excellent customer support.",
    initials: "A",
  },
  {
    name: "Manoj Reddy",
    role: "HR Manager",
    quote: "Best software company in Hyderabad.",
    initials: "M",
  },
  {
    name: "Rakesh",
    role: "Designer",
    quote: "It was a wonderful experience to work with Oklut Technologies.",
    initials: "R",
  },
  {
    name: "Vardhani Kumari",
    role: "Developer",
    quote: "Excellent management.",
    initials: "V",
  },
];

export const INDUSTRIES = [
  "Education",
  "Healthcare",
  "Transport",
  "Retail",
  "Manufacturing",
  "E-commerce",
  "CRM",
  "Travel & Logistics",
];

export const WHY_US = [
  {
    title: "Software Development",
    description:
      "Grounded in deep domain expertise across web applications, automation and B2B collaboration platforms — we implement, enhance and support applications end to end.",
    points: ["Web & automation software", "API / webservice engineering", "Database design & CI/CD"],
  },
  {
    title: "Digital & Cloud Solutions",
    description:
      "Digital transformation, AWS / Azure / Google Cloud, IoT data pipelines and Machine Learning — with managed services for migration and modernization.",
    points: ["Cloud migration & modernization", "IoT middleware & data pipelines", "Third-party integrations"],
  },
  {
    title: "IT Consulting Services",
    description:
      "Affordable offshore consulting with skilled resources and flexible billing models, so you can build products and scale quickly.",
    points: ["Offshore consulting", "Managed services", "Flexible billing models"],
  },
  {
    title: "Digital Marketing",
    description:
      "A top-rated SEO & digital marketing agency in South India since 2016 — branding, email, social, SEO, PPC and online reputation.",
    points: ["SEO, PPC & Google Ads", "Social, email & branding", "Online reputation management"],
  },
];

export const FORM_FIELDS = [
  { name: "name", label: "Full name", type: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email address", type: "email", required: true, placeholder: "you@company.com" },
  { name: "phone", label: "Phone number", type: "tel", required: false, placeholder: "+91 ..." },
  {
    name: "service",
    label: "What do you need?",
    type: "select",
    required: false,
    placeholder: "Choose a service",
    options: ["Web Development", "Software Development", "Mobile App Development", "Cloud Solutions", "IT Consulting", "Digital Marketing", "Cyber Security", "Data Analytics", "Something else"],
  },
  { name: "message", label: "Project details", type: "textarea", required: true, placeholder: "Tell us about your project…" },
];
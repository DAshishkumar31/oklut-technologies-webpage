import { COMPANY, STATS } from "./content";

export const CHAT_GREETING =
  "Hi! 👋 I'm the OKLUT AI Assistant. How can I help you today?";

export const SUGGESTED_QUESTIONS = [
  "What does OKLUT do?",
  "What services do you provide?",
  "How can I get started?",
  "Tell me more about your solutions.",
  "How can I contact your team?",
];

export const FALLBACK_ANSWER =
  "I'm not sure about that. Please contact our team for accurate information.";

const CONTACT_ANSWER = `You can reach the OKLUT team directly:\n\n• Call: ${COMPANY.phone}\n• Email: ${COMPANY.email}\n• Office: ${COMPANY.address}\n\nFor project quotes, the quickest way is to call us or use the contact form on the website. Our team typically responds within one business day, and support is available 24/7.`;

const TOPICS = [
  {
    id: "greeting",
    keys: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "namaste", "yo"],
    answer: "Hello! 👋 Welcome to OKLUT Technologies. How can I help you today?",
  },
  {
    id: "contact",
    keys: ["contact", "phone", "email", "call", "reach", "talk to", "address", "office", "where are you", "location"],
    answer: CONTACT_ANSWER,
  },
  {
    id: "about",
    keys: ["what does oklut", "what is oklut", "who are", "about", "company", "introduce", "what do you do"],
    answer: `${COMPANY.name} is a Hyderabad-based IT solutions company, serving clients since ${COMPANY.founded}. We help growing businesses accelerate with software development, mobile apps, cloud solutions, IT consulting and digital marketing — one accountable partner, end to end.\n\nWe've delivered ${STATS[1].value}+ projects for ${STATS[0].value}+ happy clients with a team of ${STATS[3].value} specialists.`,
  },
  {
    id: "services",
    keys: ["services", "what do you provide", "what can you", "offer", "capabilities", "what do you build", "solutions"],
    answer: `We offer eight disciplines under one roof:\n\n1. Web Development — websites, CMS and e-commerce\n2. Software Development — web apps, APIs, automation, CI/CD\n3. Mobile App Development — iOS and Android\n4. Digital & Cloud Solutions — AWS, Azure, GCP, IoT, ML\n5. IT Consulting — offshore consulting & managed services\n6. Digital Marketing — SEO, PPC, social, branding, ORM\n7. Cyber Security — protection and hardening\n8. Data Analytics — dashboards and insights\n\nWhich one would you like to know more about?`,
  },
  {
    id: "get-started",
    keys: ["get started", "start", "begin", "new project", "kick off", "quote", "hire", "work with"],
    answer: `Getting started is simple:\n\n1. Call ${COMPANY.phone} or use the contact form with a short description of your project\n2. We schedule a free consultation and scope the work\n3. You receive a clear proposal with timeline and pricing\n4. We start with an agile process — Discover → Design → Build → Scale\n\nWe offer fixed-scope, dedicated-team and managed-service engagement models.`,
  },
  {
    id: "products",
    keys: ["products", "portfolio", "built", "projects", "showcase", "platforms you"],
    answer: `Our shipped products include:\n\n• Online Learning & Examination System\n• Vehicle Booking Platform for SMEs\n• LMS Application Development\n• E-commerce Applications (B2B & B2C)\n• Coworks CRM & Bookings\n\nWe also build custom products in Education, Healthcare, Transport, Retail, Manufacturing and more. Want details on any of these?`,
  },
  {
    id: "web",
    keys: ["web development", "website", "cms", "wordpress", "ecommerce", "e-commerce", "online store"],
    answer: `Web Development covers custom websites, content management systems and e-commerce stores — built for performance, SEO and conversions, and able to scale with your business.`,
  },
  {
    id: "software",
    keys: ["software development", "web application", "web app", "api", "automation", "saas", "b2b", "database"],
    answer: `Software Development is our core: web applications and B2B platforms, API and webservice engineering, database design, automation software, and continuous integration/deployment — implemented, enhanced and supported end to end.`,
  },
  {
    id: "mobile",
    keys: ["mobile", "app development", "ios", "android", "iphone", "ipad", "apps"],
    answer: `We build native iOS (iPhone & iPad) and Android applications — fast, polished, and deeply integrated with your backend.`,
  },
  {
    id: "cloud",
    keys: ["cloud", "aws", "azure", "google cloud", "gcp", "migration", "iot", "machine learning", "ml", "digital transformation", "devops", "kubernetes"],
    answer: `Digital & Cloud Solutions covers cloud migration and modernization on AWS, Azure and Google Cloud, API-led integrations, IoT middleware and data pipelines, Machine Learning services and full digital transformation programs — managed end to end.`,
  },
  {
    id: "consulting",
    keys: ["consulting", "consultant", "offshore", "managed services", "resources", "staff", "billing"],
    answer: `IT Consulting gives you affordable offshore expertise: technology strategy, managed services and dedicated skilled resources with flexible billing models (fixed scope, dedicated team or managed services) — so you can build products and scale quickly.`,
  },
  {
    id: "marketing",
    keys: ["marketing", "seo", "ppc", "google ads", "social media", "branding", "email", "orm", "reputation"],
    answer: `Digital Marketing is a top-rated SEO & digital marketing practice in South India since 2016 — SEO, PPC and Google Ads, social media, email marketing, branding, marketing automation and online reputation management, serving Education, Healthcare, Retail and more.`,
  },
  {
    id: "security",
    keys: ["security", "cyber", "hack", "protect", "vulnerability"],
    answer: `Cyber Security protects your systems, networks and programs from digital attacks — including vulnerability assessment and security hardening, applied proactively across everything we build.`,
  },
  {
    id: "analytics",
    keys: ["analytics", "data", "dashboard", "insights", "reporting", "bi"],
    answer: `Data Analytics converts raw data into actionable insight — using the right tools and processes to find trends, solve problems and report clearly through dashboards.`,
  },
  {
    id: "pricing",
    keys: ["price", "pricing", "cost", "how much", "budget", "rates", "fee", "charge", "affordable"],
    answer: `Pricing depends on scope and engagement model. We offer:\n\n• Fixed scope — defined deliverables and timelines\n• Dedicated team — skilled resources with flexible billing\n• Managed services — ongoing support and operations\n\nCall ${COMPANY.phone} for a free, no-obligation quote — we'll map the right engagement within a day.`,
  },
  {
    id: "process",
    keys: ["process", "how do you work", "how we work", "method", "agile", "sprints", "timeline", "how long", "duration"],
    answer: `Our engagement follows four steps:\n\n1. Discover — we map your goals into a clear technical roadmap\n2. Design — architecture, UX and visual direction in prototypes\n3. Build — agile sprints with weekly demos and quality gates\n4. Scale — launch, 24/7 support, cloud operations and growth iterations\n\nMost projects begin shipping within 4–6 weeks.`,
  },
  {
    id: "support",
    keys: ["support", "24/7", "maintenance", "help", "ticket", "after launch"],
    answer: `Support is available 24/7 — for managed services and long-term engagements we run continuous maintenance, cloud operations and monitoring, with direct access to your team.`,
  },
  {
    id: "experience",
    keys: ["experience", "years", "team", "people", "staff", "award", "clients", "trusted", "why oklut", "reliable", "reputation"],
    answer: `Oklut has served clients since ${COMPANY.founded} with a specialist team of ${STATS[3].value}+ people: ${STATS[0].value}+ happy clients, ${STATS[1].value}+ projects delivered and ${STATS[2].value} industry awards. We're known for professional staff, 24/7 support and fair prices.`,
  },
  {
    id: "learning",
    keys: ["learning", "exam", "lms", "education", "training", "course", "e-learning", "elearning"],
    answer: `Our Online Learning & Examination System gives administrators control over student categories and published tests (registered, unregistered, paid). Our LMS adds full administration, documentation, tracking, reporting and delivery of training programs.`,
  },
  {
    id: "vehicle",
    keys: ["vehicle", "taxi", "cab", "booking", "transport", "car"],
    answer: `The Vehicle Booking Platform lets SMEs offer online taxi booking with vehicle listings, features, locations, hourly packages, special fare dates, distance pricing, coupon codes and published dates — quick and easy for customers.`,
  },
  {
    id: "coworks",
    keys: ["coworks", "workspace", "office space", "coworking", "crm bookings"],
    answer: `Coworks CRM & Bookings is a platform that helps entrepreneurs, startups and companies find and book workspace that fits their requirements — fully managed and serviced office space with flexible terms.`,
  },
];

export function findAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    let score = 0;
    for (const key of topic.keys) {
      if (q.includes(key)) score += key.length >= 6 ? 2 : 1;
    }
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  if (best && bestScore >= 2) return best.answer;
  if (best && best.id === "greeting") return best.answer;
  return FALLBACK_ANSWER;
}

export const KNOWLEDGE_VERSION = "v1";
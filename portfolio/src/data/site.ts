/**
 * Single source of truth for every piece of copy on the site.
 * Content comes from the CV. Items marked ⚠ EDIT are my best draft and
 * should be replaced with your own wording / links.
 */

export const SITE = {
  name: "Chukwuemeka Ekine",
  fullName: "Chukwuemeka Emmanuel Ekine",
  role: "Lead Backend Engineer",
  tagline:
    "I build scalable APIs, mobile apps and the interfaces on top of them.",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "chukwuemekacodev@gmail.com",
  phones: ["+234 812 757 5050", "+234 903 912 4772"],
  cv: "/Chukwuemeka_Ekine_CV.pdf",
  url: "https://chukwuemeka-ekine-xc53.vercel.app",
  socials: {
    github: "https://github.com/nuelxcode", // ⚠ EDIT: CV links to nuelxcode.github.com
    linkedin: "https://www.linkedin.com/in/chukwuemeka-ekine-07560b290/",
  },
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT = {
  heading: "Full-stack range, *backend depth.*",
  paragraphs: [
    "I'm a software engineer with over five years of experience building full-stack products, specialising in the JavaScript ecosystem. Today I lead backend engineering at Nuel Technologies, designing the architectures, APIs and data layers that web and mobile products stand on.",
    "I care about the whole path from database to pixel: secure REST services, role-based access, responsive interfaces with React and Tailwind, and mobile apps in React Native and Flutter. I work in agile teams, review code carefully and mentor along the way.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years building" },
    { value: 5, suffix: "", label: "Engineering teams" },
    { value: 3, suffix: "", label: "Platforms: web, mobile, desktop" },
  ],
  capabilities: [
    {
      title: "Backend & APIs",
      body: "Node.js and Express services with authentication, RBAC, MySQL and Redis, built to scale and easy to maintain.",
      tags: ["Node.js", "Express", "MySQL", "Redis"],
    },
    {
      title: "Mobile",
      body: "Cross-platform apps in React Native and Flutter, from live-data betting to location-based marketplaces.",
      tags: ["React Native", "Flutter", "Dart"],
    },
    {
      title: "Frontend & dashboards",
      body: "Fast, accessible interfaces and admin dashboards with React, Next.js and Tailwind CSS, plus data visualisation.",
      tags: ["React", "Next.js", "Tailwind"],
    },
    {
      title: "Delivery",
      body: "CI/CD pipelines, containers and clean Git workflows so shipping is routine instead of an event.",
      tags: ["Docker", "CI/CD", "Vercel", "Netlify"],
    },
  ],
  education: {
    school: "Miva Open University",
    program: "Computer Science",
    period: "2026 – present",
  },
};

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const EXPERIENCE: Job[] = [
  {
    role: "Lead Backend Engineer",
    company: "Nuel Technologies",
    location: "Lagos, Nigeria",
    period: "Dec 2024 — Present",
    current: true,
    points: [
      "Lead the backend team building software products from the ground up.",
      "Design scalable backend architectures for web and mobile applications.",
      "Ship secure, maintainable REST APIs with Node.js and Express, backed by MySQL.",
      "Implement authentication, authorisation and role-based access control.",
      "Set engineering standards, code-review process and best practices.",
    ],
    tags: ["Node.js", "Express", "MySQL", "RBAC"],
  },
  {
    role: "Principal Frontend Engineer (Volunteer)",
    company: "iHealth and Wellness",
    location: "United States",
    period: "Mar 2025 — Nov 2025",
    points: [
      "Led development of a comprehensive admin dashboard for internal system management.",
      "Designed the frontend architecture with React.js and Tailwind CSS.",
      "Built role-based access interfaces and data-visualisation components.",
      "Improved performance and responsiveness across large datasets; mentored developers.",
    ],
    tags: ["React", "Tailwind CSS", "Dashboards"],
  },
  {
    role: "React Native Developer",
    company: "Carrot Suit",
    location: "Lagos, Nigeria",
    period: "Sep 2024 — Mar 2025",
    points: [
      "Sole mobile developer: built a sports betting app from scratch in React Native.",
      "Owned architecture, navigation and core user experiences on Android and iOS.",
      "Displayed live match data, odds and markets; built bet-slip and wager flows.",
      "Integrated authentication and payments with the backend team.",
    ],
    tags: ["React Native", "Real-time", "Payments"],
  },
  {
    role: "Associate Software Engineer",
    company: "Ochefi Technologies",
    location: "Lagos, Nigeria",
    period: "Jun 2023 — Feb 2024",
    points: [
      "Developed and maintained full-stack web applications on the MERN stack.",
      "Built REST APIs and integrated frontend components with backend services.",
      "Took part in code reviews and kept the codebase clean and maintainable.",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    role: "Software Engineer Intern",
    company: "Naving Technologies",
    location: "Lagos, Nigeria",
    period: "Mar 2021 — Apr 2022",
    points: [
      "Built web and mobile applications with React.js, React Native and Node.js.",
      "Helped build and integrate REST APIs.",
      "Learned the full software development lifecycle hands-on.",
    ],
    tags: ["React", "React Native", "Node.js"],
  },
];

export type Project = {
  id: string;
  title: string;
  kicker: string;
  role: string;
  year?: string;
  badge?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
  visual: "graph" | "terminal" | "phone" | "chart";
  layout: "wide" | "wide-reverse" | "half";
};

export const PROJECTS: Project[] = [
  {
    // ⚠ EDIT: I only had the name, so this copy is a neutral draft. Replace with the real story.
    id: "matchmind",
    title: "MatchMind AI",
    kicker: "AI product",
    role: "Founder & engineer",
    badge: "New",
    summary:
      "An AI-driven product that finds meaningful matches and surfaces insight from data, designed and engineered end to end.",
    highlights: [
      "Product design, architecture and implementation owned in one place.",
      "Intelligent matching engine behind a fast, modern interface.",
      "Built with the same standards I apply to production backends.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "AI / ML"],
    visual: "graph",
    layout: "wide",
  },
  {
    // ⚠ EDIT: draft copy inferred from your backend standards at Nuel Technologies.
    id: "nux-express",
    title: "nux-express",
    kicker: "Backend foundation",
    role: "Creator",
    badge: "New",
    summary:
      "An opinionated Express.js foundation: structured routing, authentication, role-based access and database tooling, ready for a new product on day one.",
    highlights: [
      "Layered, testable project structure.",
      "Auth and RBAC wired in from the start.",
    ],
    stack: ["Express.js", "Node.js", "MySQL", "Redis"],
    href: "https://github.com/nuelxcode", // ⚠ EDIT: link to the repo
    visual: "terminal",
    layout: "half",
  },
  {
    id: "gighive",
    title: "GigHive",
    kicker: "Service marketplace · Mobile",
    role: "Lead Software Engineer",
    summary:
      "A mobile marketplace that connects skilled professionals with clients who need on-demand services nearby: discover, request, book and chat.",
    highlights: [
      "Location-based discovery of nearby providers.",
      "Booking workflows, secure auth and session management.",
      "Express, MySQL and Redis behind a Flutter app.",
    ],
    stack: ["Flutter", "Dart", "Express.js", "MySQL", "Redis"],
    visual: "phone",
    layout: "half",
  },
  {
    id: "data-desktop",
    title: "Data Management Desktop App",
    kicker: "Desktop · Contract",
    role: "Contract Software Developer",
    summary:
      "A cross-platform desktop app for church membership management, financial tracking and reporting, with interactive dashboards and one-click data export.",
    highlights: [
      "Member records, income and expense tracking.",
      "Interactive Chart.js analytics and visual reports.",
      "Express APIs and MongoDB with Tailwind-styled UI.",
    ],
    stack: ["Electron.js", "React", "Tailwind CSS", "Express.js", "MongoDB", "Chart.js"],
    visual: "chart",
    layout: "wide-reverse",
  },
];

export const EARLIER_WORK = [
  {
    title: "Airmetriz Logistics",
    role: "Lead Frontend Engineer",
    year: "2023",
    stack: "Next.js · Redux Toolkit · Google Maps",
    href: "https://airmetriz.vercel.app",
  },
  {
    title: "Nufy Movies",
    role: "Full Stack Developer",
    year: "2023",
    stack: "React · Express · MongoDB · TMDB",
    href: "https://nufy-movies.onrender.com",
  },
  {
    title: "Nuelmart E-Commerce",
    role: "Frontend Architect",
    year: "2022",
    stack: "React · Context API · Stripe",
    href: "https://nuelmart.netlify.app",
  },
];

export const STACK = [
  {
    group: "Languages",
    items: ["JavaScript (ES6)", "TypeScript", "Python", "C#", "Dart"],
  },
  {
    group: "Frontend & mobile",
    items: ["React", "Next.js", "React Native", "Flutter", "Tailwind CSS", "Three.js", "Electron"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "Django", "ASP.NET Core", "REST APIs", "Auth & RBAC"],
  },
  {
    group: "Data",
    items: ["MySQL", "SQL Server", "MongoDB", "Redis"],
  },
  {
    group: "DevOps & tooling",
    items: ["Docker", "CI/CD", "Netlify", "Vercel", "Git", "GitHub", "GitLab"],
  },
] as const;

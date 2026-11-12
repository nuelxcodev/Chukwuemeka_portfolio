/**
 * Single source of truth for every piece of copy on the site.
 * Content comes from the CV and project screenshots. Items marked ⚠ EDIT
 * are assumptions to confirm (roles and tech stacks I could not see).
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

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** browser = framed website screenshot, phone = tall mobile screenshot */
  kind: "browser" | "phone";
  /** domain shown in the browser frame */
  domain?: string;
};

export type Shot = {
  src: string;
  alt: string;
  kind: "browser" | "phone";
  width: number;
  height: number;
  /** shown in the fake browser address bar */
  host?: string;
};

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
  shot?: Shot;
  /** generative art, used when there is no screenshot */
  visual?: "chart";
  layout: "wide" | "wide-reverse";
};

export const PROJECTS: Project[] = [
  {
    id: "matchmind",
    title: "MatchMind AI",
    kicker: "AI football analysis · Web",
    role: "Software Engineer",
    badge: "Live",
    summary:
      "Pick a game and MatchMind reads both teams' recent form to show the likeliest outcomes, with the reasons behind them, before kick-off.",
    highlights: [
      "Goal model, recent form and head-to-head analysis for every fixture.",
      "Win-probability breakdowns on upcoming matches.",
      "Accuracy tracking, group view and an admin console.",
    ],
    // ⚠ EDIT: add your real stack
    stack: ["AI model", "Web app", "Vercel"],
    href: "https://matchmind-lime.vercel.app",
    shot: {
      src: "/projects/matchmind.webp",
      alt: "MatchMind AI home screen: 'Know the match before kick-off' with upcoming fixtures and win probabilities",
      kind: "browser",
      width: 1600,
      height: 862,
      host: "matchmind-lime.vercel.app",
    },
    layout: "wide",
  },
  {
    id: "nux-express",
    title: "Nux Express",
    kicker: "Logistics · Web",
    role: "Software Engineer",
    badge: "Live",
    summary:
      "A courier and shipment-tracking platform: enter a tracking number to see the current location and status of a parcel, anywhere in the world.",
    highlights: [
      "Tracking-number lookup with live location and status.",
      "Fast delivery, secure handling and international shipping services.",
      "Multi-language support and a customer-care channel.",
    ],
    // ⚠ EDIT: add your real stack
    stack: ["Web app", "Shipment tracking", "Vercel"],
    href: "https://site-jet-five-94.vercel.app",
    shot: {
      src: "/projects/nux-express.webp",
      alt: "Nux Express home screen: 'Track your shipment with ease' with a tracking-number field over a dotted world map",
      kind: "browser",
      width: 1600,
      height: 862,
      host: "site-jet-five-94.vercel.app",
    },
    layout: "wide-reverse",
  },
  {
    id: "gighive",
    title: "GigHive",
    kicker: "Service marketplace · Mobile",
    role: "Lead Software Engineer",
    summary:
      "A mobile marketplace that connects skilled professionals with clients who need on-demand services nearby: discover, request, book and get paid.",
    highlights: [
      "Provider dashboard with earnings, withdrawals and job history.",
      "Location-based discovery of nearby providers.",
      "Booking workflows, secure auth and session management.",
    ],
    stack: ["Flutter", "Dart", "Express.js", "MySQL", "Redis"],
    shot: {
      src: "/projects/gighive.webp",
      alt: "GigHive provider home screen showing balance, quick actions, services and recent jobs",
      kind: "phone",
      width: 640,
      height: 1297,
    },
    layout: "wide",
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
      "Express APIs and MongoDB with a Tailwind-styled UI.",
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

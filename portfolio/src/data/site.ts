/**
 * Single source of truth for every piece of copy on the site.
 * All facts come from the CV, the project screenshots and the live project
 * links. Items marked ⚠ EDIT are my best guess and need your confirmation.
 */

export const SITE = {
  name: "Chukwuemeka Ekine",
  fullName: "Chukwuemeka Emmanuel Ekine",
  role: "Backend Engineer",
  company: "Nuel Technologies",
  tagline: "I build scalable APIs, mobile apps and the interfaces on top of them.",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "chukwuemekacodev@gmail.com",
  phones: ["+234 812 757 5050", "+234 903 912 4772"],
  cv: "/Chukwuemeka_Ekine_CV.pdf",
  url: "https://chukwuemeka-ekine-xc53.vercel.app",
  /** ⚠ EDIT: set to false (or change the text) to update the status chip everywhere */
  openToWork: true,
  statusText: "Open to new opportunities",
  socials: {
    github: "https://github.com/nuelxcode", // ⚠ EDIT: CV links to nuelxcode.github.com
    linkedin: "https://www.linkedin.com/in/chukwuemeka-ekine-07560b290/",
  },
} as const;

export const EDUCATION = {
  school: "Federal University of Technology Owerri",
  short: "FUTO",
  program: "Information Technology",
  status: "Currently enrolled",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  line: "building scalable APIs, mobile apps and the interfaces on top of them.",
  sub: "Five-plus years across web, mobile and desktop. I like turning loose requirements into reliable, secure systems, and making sure they feel good to use.",
} as const;

/* ------------------------------------------------------------------ */
/* Recruiter snapshot                                                  */
/* ------------------------------------------------------------------ */

export const SNAPSHOT = {
  title: "The 20-second version",
  lede: "Everything a recruiter or hiring manager needs to decide whether we should talk.",
  facts: [
    { label: "Current role", value: "Backend Engineer · Nuel Technologies" },
    { label: "Experience", value: "5+ years · 5 engineering teams" },
    { label: "Core stack", value: "Node.js · Express · MySQL · React · Next.js · TypeScript" },
    { label: "Also ships", value: "React Native · Flutter · Electron" },
    { label: "Based in", value: "Lagos, Nigeria · WAT (UTC+1)" },
    { label: "Education", value: "Information Technology, FUTO (currently enrolled)" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  heading: "Full-stack range, *backend depth.*",
  paragraphs: [
    "Hi, I'm Chukwuemeka. I'm a software engineer based in Lagos with more than five years of experience building full-stack applications. I started as a software engineer intern at Naving Technologies in 2021, and since then I've worked across five engineering teams, shipping web apps, mobile apps and desktop software along the way.",
    "JavaScript is where I'm most at home: React, Next.js, Node.js, Express and TypeScript, with MongoDB and MySQL behind them. But I choose tools for the job, not the other way round, so I've also built with React Native, Flutter, Python (Django) and C# (ASP.NET Core). Whatever the stack, I care about the same things: responsive interfaces, clean RESTful integrations, and real-time updates that just work.",
    "Today I'm a Backend Engineer at Nuel Technologies, where I design backend architectures, build secure APIs with Node.js and Express, and implement authentication and role-based access control on top of MySQL. I also help the team set the engineering standards and code-review habits that keep products maintainable as they grow. I work the agile way, in scrums and small iterations, close to the frontend and mobile teams, and I enjoy mentoring other developers as much as shipping features myself.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years building" },
    { value: 5, suffix: "", label: "Engineering teams" },
    { value: 3, suffix: "", label: "Platforms: web, mobile, desktop" },
  ],
} as const;

export type Fit = {
  role: string;
  pitch: string;
  evidence: string[];
  tags: string[];
};

export const FIT_HEADING = "Where I'd fit on *your team.*";
export const FIT_LEDE =
  "Job titles blur, so here's the work behind each role I can step into, with where I've actually done it.";

export const FIT: Fit[] = [
  {
    role: "Backend Engineer",
    pitch: "Secure, maintainable APIs and data layers that web and mobile teams can build on.",
    evidence: [
      "Backend Engineer at Nuel Technologies: Node.js and Express APIs, MySQL, authentication and role-based access control.",
      "GigHive: marketplace services built on Express, MySQL and Redis.",
      "Data Management Desktop App: Express APIs backed by MongoDB.",
    ],
    tags: ["Node.js", "Express", "MySQL", "Redis", "RBAC"],
  },
  {
    role: "Full-Stack Engineer",
    pitch: "End-to-end ownership, from the database schema to the screen.",
    evidence: [
      "Associate Software Engineer at Ochefi Technologies: MERN web applications.",
      "Data Management Desktop App: Electron, React, Express and MongoDB in one product.",
      "MatchMind AI and Nux Express: live web products.",
    ],
    tags: ["MERN", "Next.js", "TypeScript"],
  },
  {
    role: "Mobile Engineer",
    pitch: "Cross-platform apps with live data and a smooth, native-feeling experience.",
    evidence: [
      "Carrot Suit: sole mobile developer on a sports betting app in React Native, shipped to Android and iOS.",
      "GigHive: a location-based service marketplace in Flutter and Dart.",
      "Naving Technologies: React Native work as an intern.",
    ],
    tags: ["React Native", "Flutter", "Dart"],
  },
  {
    role: "Frontend & Dashboard Engineer",
    pitch: "Fast, role-aware interfaces and data visualisation that stay quick on large datasets.",
    evidence: [
      "iHealth and Wellness: admin dashboard with role-based interfaces and data visualisation.",
      "Data Management Desktop App: interactive Chart.js analytics.",
      "Next.js and Tailwind CSS across web projects.",
    ],
    tags: ["React", "Next.js", "Tailwind", "Chart.js"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
  tags: string[];
};

/** Newest first. The page shows the first three and folds the rest. */
export const EXPERIENCE: Job[] = [
  {
    role: "Backend Engineer",
    company: "Nuel Technologies",
    location: "Lagos, Nigeria",
    period: "Dec 2024 — Present",
    current: true,
    summary:
      "I design and build the backend systems behind Nuel's web and mobile products, from the first database schema to production-ready APIs. I work alongside the frontend and mobile teams to turn product requirements into a clear technical architecture, and I help keep quality high through shared standards and code review.",
    points: [
      "Lead the backend engineering team in building software products from the ground up.",
      "Design and implement scalable backend architectures for web and mobile applications.",
      "Develop secure, maintainable RESTful APIs with Node.js and Express.js.",
      "Design and manage relational databases in MySQL, and optimise their performance and scalability.",
      "Implement authentication, authorisation and role-based access control.",
      "Establish backend development standards, code-review processes and engineering best practices.",
    ],
    tags: ["Node.js", "Express", "MySQL", "RBAC"],
  },
  {
    role: "Principal Frontend Engineer (Volunteer)",
    company: "iHealth and Wellness",
    location: "United States",
    period: "Mar 2025 — Nov 2025",
    summary:
      "A volunteer engagement where I took ownership of the frontend for an internal admin dashboard. The focus was a clean, scalable React architecture, interfaces that adapt to each user's role, and data visualisation that stays responsive even with large datasets.",
    points: [
      "Led the development of a comprehensive admin dashboard for internal system management.",
      "Designed the frontend architecture with React.js and Tailwind CSS.",
      "Built role-based access control interfaces and data-visualisation components.",
      "Optimised performance and UI responsiveness across large datasets.",
      "Worked closely with backend engineers to integrate secure APIs.",
      "Mentored developers and enforced clean-code standards.",
    ],
    tags: ["React", "Tailwind CSS", "Dashboards", "RBAC UI"],
  },
  {
    role: "React Native Developer",
    company: "Carrot Suit",
    location: "Lagos, Nigeria",
    period: "Sep 2024 — Mar 2025",
    summary:
      "As the only mobile developer, I built a sports betting application from scratch in React Native: the architecture, the navigation and the core user experiences, running smoothly on both Android and iOS.",
    points: [
      "Owned the app's architecture, navigation and core user experiences.",
      "Displayed live match data, betting odds and markets from backend APIs.",
      "Built bet-slip functionality, wager-selection workflows and betting interfaces.",
      "Managed state efficiently and delivered real-time updates for dynamic data.",
      "Optimised performance for a smooth cross-platform experience.",
      "Integrated APIs, authentication and payments with the backend team, and took part in testing, deployment and bug fixing.",
    ],
    tags: ["React Native", "Real-time data", "Payments", "Android & iOS"],
  },
  {
    role: "Associate Software Engineer",
    company: "Ochefi Technologies",
    location: "Lagos, Nigeria",
    period: "Jun 2023 — Feb 2024",
    summary:
      "My first full-time engineering role, building and maintaining full-stack web applications on the MERN stack and learning what clean, reviewable code looks like in a real team.",
    points: [
      "Developed and maintained scalable full-stack web applications on the MERN stack.",
      "Built RESTful APIs and integrated frontend components with backend services.",
      "Took part in code reviews and followed best practices for clean, maintainable code.",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    role: "Software Engineer Intern",
    company: "Naving Technologies",
    location: "Lagos, Nigeria",
    period: "Mar 2021 — Apr 2022",
    summary:
      "Where it started. Over a year as an intern I worked across web and mobile, and saw the full software development lifecycle up close.",
    points: [
      "Built dynamic web and mobile applications with React.js, React Native and Node.js.",
      "Assisted in building and integrating RESTful APIs.",
      "Gained hands-on experience across the full software development lifecycle.",
    ],
    tags: ["React", "React Native", "Node.js"],
  },
];

export const EXPERIENCE_VISIBLE = 3;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

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

export const PROJECTS_HEADING = "Things I've *shipped* and am shipping.";
export const PROJECTS_LEDE =
  "A football-analysis AI, a logistics platform, a mobile marketplace and a desktop tool: different problems, built with the same care for the people using them.";

export const PROJECTS: Project[] = [
  {
    id: "matchmind",
    title: "MatchMind AI",
    kicker: "AI football analysis · Web",
    role: "Software Engineer",
    badge: "Live",
    summary:
      "Football fans and analysts shouldn't have to dig through stats to understand a game. Pick a match and MatchMind reads both teams' recent form, then shows the likeliest outcomes along with the reasons behind them, before kick-off.",
    highlights: [
      "Goal model, recent form and head-to-head analysis for every fixture.",
      "Win-probability breakdowns on upcoming matches.",
      "Accuracy tracking, a group view and an admin console.",
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
      "Waiting on a parcel is stressful when you can't see where it is. Nux Express is a courier platform built around one simple promise: enter your tracking number and see the current location and status of your shipment, wherever it is in the world.",
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
    role: "Software Engineer",
    summary:
      "Skilled people want steady work and clients want trustworthy help close by. GigHive brings them together in a mobile app: clients discover nearby professionals, request and book services, and providers manage their jobs and earnings in one place.",
    highlights: [
      "Provider dashboard with earnings, withdrawals and job history.",
      "Location-based discovery of nearby providers.",
      "Booking workflows, secure authentication and session management.",
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
      "A church needed one reliable place for its member records, finances and reports. I built a cross-platform desktop app that manages membership, tracks income and expenses, and turns the numbers into dashboards and exports that leaders can act on.",
    highlights: [
      "Member records, income and expense tracking.",
      "Interactive Chart.js analytics and visual reports.",
      "Express APIs and MongoDB behind a Tailwind-styled interface, with data export.",
    ],
    stack: ["Electron.js", "React", "Tailwind CSS", "Express.js", "MongoDB", "Chart.js"],
    visual: "chart",
    layout: "wide-reverse",
  },
];

export const EARLIER_WORK = [
  {
    title: "Airmetriz Logistics",
    role: "Frontend Engineer",
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

/* ------------------------------------------------------------------ */
/* Stack                                                               */
/* ------------------------------------------------------------------ */

export const STACK_HEADING = "Tools I reach for *daily.*";
export const STACK_LEDE =
  "JavaScript and TypeScript are where I'm fastest, but I pick tools for the problem in front of me: a relational or document database, a native-feeling mobile app or a fast web one.";

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

/* ------------------------------------------------------------------ */
/* Recruiter FAQ                                                       */
/* ------------------------------------------------------------------ */

export const FAQ_HEADING = "Questions recruiters *ask first.*";
export const FAQ = [
  {
    q: "What roles are you best suited for?",
    a: "Backend and full-stack engineering are my strongest fit. I'm currently a Backend Engineer, and I've also shipped mobile apps in React Native and Flutter and built dashboards in React, so I'm comfortable on cross-functional teams.",
  },
  {
    q: "What is your core tech stack?",
    a: "JavaScript and TypeScript, with Node.js and Express on the backend, React and Next.js on the frontend, and MySQL, MongoDB and Redis for data. I've also worked with Python (Django), C# (ASP.NET Core) and Flutter (Dart), and I use Docker and CI/CD pipelines on Netlify and Vercel to ship.",
  },
  {
    q: "Have you led or mentored other engineers?",
    a: "Yes. At Nuel Technologies I lead the backend engineering team's work and help set our standards and code-review process. At iHealth and Wellness I mentored developers and enforced clean-code practices as Principal Frontend Engineer (volunteer).",
  },
  {
    q: "How do you work with a team?",
    a: "The agile way: scrum meetings, small iterations and regular code reviews. I stay in close contact with frontend, mobile and backend teammates so that APIs, requirements and architecture are agreed early rather than discovered late.",
  },
  {
    q: "Can I see your work running?",
    a: "Yes. MatchMind AI and Nux Express are live, and the Earlier work list links to Airmetriz Logistics, Nufy Movies and Nuelmart. My code is on GitHub, and the CV has the full project write-ups.",
  },
  {
    q: "Where are you based, and how do I reach you?",
    a: "I'm in Lagos, Nigeria (WAT, UTC+1). Email is the fastest way to reach me. LinkedIn and phone are also listed below, and you can save my details straight to your contacts.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  heading: "Let's build\n*something* great.",
  lede: "If you're hiring for a backend, full-stack or mobile role, or you have something interesting to build, I'd love to hear about it. Send a note below or email me directly.",
} as const;

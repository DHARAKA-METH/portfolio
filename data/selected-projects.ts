/**
 * Projects featured in the homepage showcase.
 * Keep this curated list separate from `projects.ts`, which powers /projects.
 */
export type SelectedProject = {
  slug: string;
  title: string;
  period: [string, string];
  role: string;
  description: string;
  technologies: string[];
  image?: string;
  mark: string;
  accent: string;
};

export const selectedProjects: SelectedProject[] = [
  {
    slug: "traceusage",
    title: "TraceUsage - API Usage Monitoring Platform",
    period: ["2026", "Present"],
    role: "Full-Stack Developer",
    description:
      "An API observability platform that tracks endpoint traffic and frontend response-field usage, helping teams make maintenance decisions from real usage data.",
    technologies: ["Java", "Spring Boot", "Next.js", "TypeScript", "Apache Kafka", "PostgreSQL", "Docker"],
    image: "/mainPage/TraceUsage_Fields_1440x1080.webp",
    mark: "TU",
    accent: "from-[#4338CA] to-[#2563EB]",
  },
  {
    slug: "mindspace",
    title: "MindSpace - Student Wellness Application",
    period: ["Jul 2026", "Aug 2026"],
    role: "Developer",
    description:
      "A student wellness app for mood check-ins, personal wellness resources, AI-assisted guidance, and access to counselor chat and appointments.",
    technologies: ["React Native", "Expo", "TypeScript", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "Hugging Face"],
    image: "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976231/1.0.png",
    mark: "MS",
    accent: "from-[#595783] to-[#7773A3]",
  },
  {
    slug: "kazu",
    title: "Kazu - IoT Pet Tracking System",
    period: ["Oct 2025", "Dec 2025"],
    role: "Developer",
    description:
      "A GPS-enabled pet tracking system that pairs a Flutter app with an IoT device for live location updates, pet status, and configurable safe zones.",
    technologies: ["Flutter", "Dart", "GPS", "Arduino", "MQTT", "Firebase", "Google Maps"],
    image: "/mainPage/Pet_Details_Screen.png",
    mark: "KZ",
    accent: "from-[#315B7D] to-[#5188A9]",
  },
  {
    slug: "rescuepaws",
    title: "RescuePaws - Stray Dog Management System",
    period: ["Mar 2026", "Apr 2026"],
    role: "Developer",
    description:
      "A full-stack rescue coordination platform for reporting stray dogs, browsing cases, and tracking rescue status, built around containerized microservices.",
    technologies: ["Spring Boot", "Next.js", "Spring Cloud Gateway", "JWT", "MySQL", "Docker", "NGINX"],
    image: "/images/rescuepaws-architecture-adjusted-1920x1440.png",
    mark: "RP",
    accent: "from-[#185E5B] to-[#2C8580]",
  },
];

export type ProjectHighlight = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  href: string;
  external?: boolean;
};

export const projectHighlights: ProjectHighlight[] = [
    {
    id: "rescuepaws",
    title: "RescuePaws",
    description: "A microservices platform for reporting and coordinating stray dog rescue cases.",
    technologies: ["Spring Boot", "Next.js", "Spring Cloud Gateway", "JWT", "MySQL", "Docker", "NGINX", "Cloudinary"],
    imageUrl: "/images/rescuepaws-architecture-adjusted-1920x1440.png",
    href: "/projectSection/#rescuepaws",
  },
    {
    id: "mindspace",
    title: "MindSpace",
    description: "A student wellness platform for mood tracking, AI guidance, resources, and counselor support.",
    technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
    imageUrl: "/images/mindspace-architecture-1920x1440.png",
    href: "/projectSection/#mindspace",
  },

  {
    id: "kazu",
    title: "KaZU",
    description: "An IoT pet-tracking app with GPS, safe zones, live updates, and alerts.",
    technologies: ["Flutter", "Dart", "MQTT", "Firebase"],
    imageUrl: "/images/kazu-architecture-1920x1440.png",
    href: "/projectSection#kazu",
  },
  {
    id: "member-of-the-month",
    title: "Member of the Month",
    description: "Recognized as CSDS Member of the Month for August for my dedication and contributions as an IT member and developer.",
    technologies: [],
    imageUrl: "/images/member-of-august-1920x1440.png",
    href: "https://www.linkedin.com/posts/career-skills-development-society_memberofthemonth-csds-cgu-activity-7505815636682510336-glPm?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADZ1nZkBrhl0FrnwwBwMyEvUJkGEoKruecE",
    external: true,
  },
];

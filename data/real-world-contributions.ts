export type RealWorldContribution = {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  website: string;
  domain: string;
  image?: string;
};

export const realWorldContributions: RealWorldContribution[] = [
  {
    id: "jesa",
    title: "JESA 2026",
    role: "IT Member / Web Developer",
    period: "Jun 2026 – Sep 2026",
    description:
      "Contributed to the overall website revamp, redesigned the registration process, and implemented new features based on project requirements to improve functionality and user experience.",
    website: "https://jesa.lk/",
    domain: "jesa.lk",
    image: "/mainPage/J’pura Employability Skills Awards.png",
  },
  {
    id: "touch-the-peak",
    title: "Touch the Peak 2026",
    role: "IT Member / Web Developer",
    period: "Jun 2026 – Present",
    description:
      "Maintained and improved the event website by implementing new features based on project requirements to enhance functionality and user experience.",
    website: "https://touchthepeak.com/",
    domain: "touchthepeak.com",
    image: "/mainPage/touch_the_peak_.png",
  },
];

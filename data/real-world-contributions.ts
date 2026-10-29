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
    description: "Awards platform for the University of Sri Jayewardenepura.",
    website: "https://jesa.lk/",
    domain: "jesa.lk",
    image: "/mainPage/J’pura Employability Skills Awards.png",
  },
  {
    id: "touch-the-peak",
    title: "Touch the Peak 2026",
    role: "IT Member / Web Developer",
    period: "Jun 2026 – Present",
    description: "Job fair website for the University of Sri Jayewardenepura.",
    website: "https://touchthepeak.com/",
    domain: "touchthepeak.com",
    image: "/mainPage/touch_the_peak_.png",
  },
];

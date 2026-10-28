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
      "Helped revamp the registration experience, adding form validation with Zod and automated registration emails with Resend.",
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
      "Help maintain the event website by fixing bugs and building new features with the development team using GitHub.",
    website: "https://touchthepeak.com/",
    domain: "touchthepeak.com",
    image: "/mainPage/touch_the_peak_.png",
  },
];
